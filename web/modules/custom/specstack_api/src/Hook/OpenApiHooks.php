<?php

declare(strict_types=1);

namespace Drupal\specstack_api\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\specstack_api\Plugin\openapi\OpenApiGenerator\ContractRestGenerator;

/**
 * Selects module-owned contracts for REST documentation.
 */
final class OpenApiHooks {

  /**
   * Uses the OpenAPI 3 generator for the standard REST documentation page.
   *
   * @param array<string, array<string, mixed>> $definitions
   *   Discovered OpenAPI generator plugin definitions.
   */
  #[Hook('openapi_generator_alter')]
  public function generatorAlter(array &$definitions): void {
    if (isset($definitions['rest'])) {
      $definitions['rest']['class'] = ContractRestGenerator::class;
    }
  }

}
