<?php

declare(strict_types=1);

namespace Drupal\specstack_api\Drush\Commands;

use Drupal\specstack_api\OpenApi\Document;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands;

/**
 * Exports the contracts consumed by the frontend OpenAPI client.
 */
final class SpecStackApiCommands extends DrushCommands {

  public function __construct(private readonly Document $document) {
    parent::__construct();
  }

  /**
   * Exports contracts or fails when the committed document has drifted.
   *
   * @param array{destination: string, check: bool} $options
   *   Export path and drift-check mode.
   */
  #[CLI\Command(name: 'specstack:openapi:generate', aliases: ['ssk-openapi', 'generate_openapi_file'])]
  #[CLI\Option(name: 'destination', description: 'JSON path relative to the project root, or an absolute path.')]
  #[CLI\Option(name: 'check', description: 'Check the committed output without writing it.')]
  public function generate(
    array $options = [
      'destination' => 'web/themes/custom/specstack_theme/openapi_schemas/openapi.json',
      'check' => FALSE,
    ],
  ): int {
    $destination = $options['destination'];
    $target = str_starts_with($destination, '/') ? $destination : dirname(DRUPAL_ROOT) . '/' . $destination;
    $json = Document::encode($this->document->build());
    if (!empty($options['check'])) {
      if (!is_file($target) || file_get_contents($target) !== $json) {
        throw new \RuntimeException('OpenAPI output has drifted. Run drush specstack:openapi:generate and pnpm openapi-ts.');
      }
      $this->logger()->success('OpenAPI output is up to date.');
      return self::EXIT_SUCCESS;
    }
    if (!is_dir(dirname($target)) && !mkdir(dirname($target), 0775, TRUE) && !is_dir(dirname($target))) {
      throw new \RuntimeException('Cannot create ' . dirname($target));
    }
    if (file_put_contents($target, $json) === FALSE) {
      throw new \RuntimeException('Cannot write ' . $target);
    }
    $this->logger()->success('Generated ' . $target);
    return self::EXIT_SUCCESS;
  }

}
