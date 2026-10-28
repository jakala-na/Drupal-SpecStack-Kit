<?php

declare(strict_types=1);

namespace Drupal\specstack_hello_world\Plugin\rest\resource;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\rest\Plugin\ResourceBase;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the hello-world collection endpoint.
 *
 * @RestResource(
 *   id = "specstack_hello_world_collection",
 *   label = @Translation("SpecStack hello-world collection"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/hello-world",
 *     "create" = "/api/v1/hello-world"
 *   }
 * )
 */
final class HelloWorldCollectionResource extends ResourceBase {

  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): self {
    return new self(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('specstack_hello_world'),
      $container->get('entity_type.manager'),
    );
  }

  public function get(): ModifiedResourceResponse {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'hello_world')
      ->sort('created', 'DESC')
      ->execute();

    $items = [];
    foreach ($storage->loadMultiple($ids) as $node) {
      $items[] = [
        'id' => (int) $node->id(),
        'title' => $node->label(),
      ];
    }

    return new ModifiedResourceResponse(['data' => $items]);
  }

  public function post(array $data): ModifiedResourceResponse {
    $node = $this->entityTypeManager->getStorage('node')->create([
      'type' => 'hello_world',
      'title' => $data['title'] ?? 'Hello world',
      'status' => 1,
    ]);
    $node->save();

    return new ModifiedResourceResponse([
      'data' => [
        'id' => (int) $node->id(),
        'title' => $node->label(),
      ],
    ], 201);
  }

}
