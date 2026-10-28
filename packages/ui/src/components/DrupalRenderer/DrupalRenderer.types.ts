import type { ComponentType, ReactElement } from "react";

export type ReactSettings = {
  elId: string;
  [key: string]: unknown;
};

export type BlockComponent = ComponentType<ReactSettings>;

export type BlocksConfig = Record<string, BlockComponent>;

export type DrupalRendererProps = {
  blocks?: BlocksConfig;
};

export type PortalConfig = {
  el: HTMLElement;
  component: ReactElement;
};
