import { ComponentType, LazyExoticComponent, ReactNode, Suspense } from "react";
import type { BlockComponent, ReactSettings } from "../components/DrupalRenderer";

export default function createLazyBlock(
  LazyComponent: LazyExoticComponent<ComponentType<ReactSettings>>,
  fallback: ReactNode = null,
): BlockComponent {
  return function LazyBlock(props: ReactSettings) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
