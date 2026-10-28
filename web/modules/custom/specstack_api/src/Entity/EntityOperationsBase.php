<?php

declare(strict_types=1);

namespace Drupal\specstack_api\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Small reusable CRUD helper for demo REST resources.
 */
abstract class EntityOperationsBase {

  public function __construct(
    protected readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  abstract protected function entityTypeId(): string;

  protected function storage(): EntityStorageInterface {
    return $this->entityTypeManager->getStorage($this->entityTypeId());
  }

  public function load(string|int $id): ?ContentEntityInterface {
    $entity = $this->storage()->load($id);
    return $entity instanceof ContentEntityInterface ? $entity : NULL;
  }

  public function create(array $values): ContentEntityInterface {
    $entity = $this->storage()->create($values);
    $entity->save();

    return $entity;
  }

  public function update(ContentEntityInterface $entity, array $values): ContentEntityInterface {
    foreach ($values as $field => $value) {
      if ($entity->hasField($field)) {
        $entity->set($field, $value);
      }
    }

    $entity->save();
    return $entity;
  }

  public function delete(ContentEntityInterface $entity): void {
    $entity->delete();
  }

}
