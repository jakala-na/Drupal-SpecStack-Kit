import type { BlockComponent } from "../components/DrupalRenderer";
import { HelloWorldCrud } from "../blocks/HelloWorld";

export const blocks: Record<string, BlockComponent> = {
  '[data-specstack-react-app="hello-world"]': HelloWorldCrud,
};
