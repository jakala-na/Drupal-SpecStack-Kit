<?php

declare(strict_types=1);

namespace Drupal\specstack_api\Plugin\openapi\OpenApiGenerator;

use Drupal\specstack_api\OpenApi\Document;
use Drupal\openapi_rest\Plugin\openapi\OpenApiGenerator\RestGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Serves the module-owned OpenAPI 3 contract through the standard REST docs.
 */
final class ContractRestGenerator extends RestGenerator {

  /**
   * The merged module-owned OpenAPI 3 contract.
   */
  protected Document $document;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->document = $container->get(Document::class);
    return $instance;
  }

  /**
   * {@inheritdoc}
   *
   * @return array<string, mixed>
   *   The same OpenAPI 3 document used for SDK generation and validation.
   */
  public function getSpecification(): array {
    $specification = $this->document->build();
    $specification['servers'] = [['url' => $this->request->getBasePath() ?: '/']];
    return $specification;
  }

}
