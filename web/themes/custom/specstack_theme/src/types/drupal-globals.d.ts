/**
 * Ambient types for Drupal libraries attached with theme IIFE scripts
 * (`core/drupal`, `core/once`).
 */

interface DrupalBehavior {
  attach: (context: Document | Element, settings?: DrupalSettings) => void;
  detach?: (context: Document | Element, settings?: DrupalSettings, trigger?: string) => void;
}

interface DrupalSettings {
  [key: string]: unknown;
}

interface DrupalStatic {
  behaviors: Record<string, DrupalBehavior>;
}

declare const Drupal: DrupalStatic;

declare function once(
  id: string,
  selector: string,
  context?: Document | Element | null,
): HTMLElement[];
