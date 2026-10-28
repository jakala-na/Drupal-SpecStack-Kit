<?php

declare(strict_types=1);

namespace Drupal\specstack_api\OpenApi;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * Collects OpenAPI contracts from enabled modules.
 */
final class Document {

  /**
   * Cached merged document for the current request.
   *
   * @var array<string, mixed>|null
   */
  private ?array $document = NULL;

  public function __construct(
    private readonly ModuleHandlerInterface $moduleHandler,
  ) {}

  /**
   * Returns the deterministic OpenAPI document for Drush, validation, and Swagger.
   *
   * @return array<string, mixed>
   *   The merged OpenAPI document.
   */
  public function build(): array {
    if ($this->document !== NULL) {
      return $this->document;
    }
    $files = [];
    foreach ($this->moduleHandler->getModuleList() as $extension) {
      $files = array_merge($files, glob(DRUPAL_ROOT . '/' . $extension->getPath() . '/openapi_schema/*.yml') ?: []);
    }
    return $this->document = self::fromFiles($files);
  }

  /**
   * Merges contracts with unique operation and component definitions.
   *
   * @param list<string> $files
   *   Contract fragment paths.
   *
   * @return array<string, mixed>
   *   OpenAPI 3 document.
   */
  public static function fromFiles(array $files): array {
    sort($files, SORT_STRING);
    $document = [
      'openapi' => '3.0.3',
      'info' => ['title' => 'SpecStack API', 'version' => '1.0.0'],
      'paths' => [],
      'components' => ['schemas' => []],
    ];
    foreach ($files as $file) {
      $fragment = Yaml::parseFile($file);
      if (!is_array($fragment)) {
        throw new \UnexpectedValueException('Invalid OpenAPI fragment: ' . $file);
      }
      foreach ($fragment['paths'] ?? [] as $path => $operations) {
        foreach ($operations as $method => $operation) {
          if (isset($document['paths'][$path][$method])) {
            throw new \LogicException("Duplicate OpenAPI operation: $method $path ($file).");
          }
          $document['paths'][$path][$method] = $operation;
        }
      }
      foreach ($fragment['components'] ?? [] as $type => $components) {
        foreach ($components as $name => $component) {
          if (isset($document['components'][$type][$name])) {
            throw new \LogicException("Duplicate OpenAPI component: $type/$name ($file).");
          }
          $document['components'][$type][$name] = $component;
        }
      }
    }
    ksort($document['paths']);
    foreach ($document['components'] as &$components) {
      ksort($components);
    }
    return $document;
  }

  /**
   * Canonical on-disk format, including a final newline.
   *
   * @param array<string, mixed> $document
   *   An OpenAPI document to encode.
   */
  public static function encode(array $document): string {
    return json_encode($document, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR) . "\n";
  }

}
