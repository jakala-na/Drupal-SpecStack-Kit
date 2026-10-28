import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DrupalSdkProvider } from "@specstack/drupal-sdk";
import type { DrupalRendererProps, PortalConfig, ReactSettings } from "./DrupalRenderer.types";

export type {
  BlockComponent,
  BlocksConfig,
  DrupalRendererProps,
  ReactSettings,
} from "./DrupalRenderer.types";

function getSettings(element: HTMLElement, portalKey: string): ReactSettings {
  const { reactSettings: reactSettingsString } = element.dataset;

  if (!reactSettingsString) {
    return { elId: portalKey };
  }

  try {
    return {
      ...(JSON.parse(reactSettingsString) as Record<string, unknown>),
      elId: portalKey,
    };
  } catch {
    return { elId: portalKey };
  }
}

export function DrupalRenderer({ blocks = {} }: DrupalRendererProps) {
  const [portals, setPortals] = useState<PortalConfig[]>([]);

  useEffect(() => {
    const nextPortals: PortalConfig[] = [];

    Object.entries(blocks).forEach(([selector, Component]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        const portalKey = `${selector}-${index}`;

        nextPortals.push({
          el: element,
          component: <Component {...getSettings(element, portalKey)} />,
        });
      });
    });

    setPortals(nextPortals);
  }, [blocks]);

  return (
    <DrupalSdkProvider>
      {portals.map((portal, index) => createPortal(portal.component, portal.el, `portal-${index}`))}
    </DrupalSdkProvider>
  );
}
