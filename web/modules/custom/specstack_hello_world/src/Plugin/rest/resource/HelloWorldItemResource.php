<?php

declare(strict_types=1);

namespace Drupal\specstack_hello_world\Plugin\rest\resource;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\rest\Plugin\ResourceBase;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Provides the hello-world item endpoint.
 *
 * @RestResource(
 *   id = "specstack_hello_world_item",
 *   label = @Translation("SpecStack hello-world item"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/hello-world/{id}"
 *   }
 * )
 */
final class HelloWorldItemResource extends ResourceBase {

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

  public function get(int $id): ModifiedResourceResponse {
    $node = $this->loadHelloWorld($id);

    return new ModifiedResourceResponse([
      'data' => [
        'id' => (int) $node->id(),
        'title' => $node->label(),
      ],
    ]);
  }

  public function patch(int $id, array $data): ModifiedResourceResponse {
    $node = $this->loadHelloWorld($id);
    $node->setTitle($data['title'] ?? $node->label());
    $node->save();

    return $this->get($id);
  }

  public function delete(int $id): ModifiedResourceResponse {
    $this->loadHelloWorld($id)->delete();

    return new ModifiedResourceResponse(NULL, 204);
  }

  private function loadHelloWorld(int $id): NodeInterface {
    $node = $this->entityTypeManager->getStorage('node')->load($id);
    if (!$node instanceof NodeInterface || $node->bundle() !== 'hello_world') {
      throw new NotFoundHttpException();
    }

    return $node;
  }

}
