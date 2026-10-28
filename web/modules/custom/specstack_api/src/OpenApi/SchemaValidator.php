<?php

declare(strict_types=1);

namespace Drupal\specstack_api\OpenApi;

use JsonSchema\Validator;

/**
 * JSON Schema validation of the OpenAPI 3 schema subset used by contracts.
 *
 * Validates types, references, required fields, bounds, unique items, and
 * additionalProperties. OpenAPI nullable is normalized for the JSON Schema
 * validator. No coercion: numeric strings and object-shaped lists fail.
 */
final class SchemaValidator {

  /**
   * Validates a named component, including nested references and constraints.
   *
   * @param mixed $data
   *   The wire data to validate.
   * @param array<string, mixed> $document
   *   The complete OpenAPI document.
   * @param string $component
   *   A component name under components/schemas.
   *
   * @return list<string>
   *   Property paths and error messages; empty when valid.
   */
  public function errors(mixed $data, array $document, string $component): array {
    if (!isset($document['components']['schemas'][$component])) {
      throw new \LogicException('Unknown schema component: ' . $component);
    }
    $schema = [
      '$ref' => '#/components/schemas/' . $component,
      'components' => $this->normalize($document['components']),
    ];
    $schema = json_decode(json_encode($schema, JSON_THROW_ON_ERROR));
    $value = json_decode(json_encode($data, JSON_THROW_ON_ERROR));
    $validator = new Validator();
    $validator->validate($value, $schema);
    return array_map(
      static fn(array $error): string => ($error['property'] ?: '$') . ': ' . $error['message'],
      $validator->getErrors(),
    );
  }

  /**
   * Converts nullable into standard JSON Schema without mutating the contract.
   *
   * @param array<string|int, mixed> $schema
   *   A schema fragment or list of schema fragments.
   *
   * @return array<string|int, mixed>
   *   The normalized schema fragment.
   */
  private function normalize(array $schema): array {
    foreach ($schema as &$value) {
      if (is_array($value)) {
        $value = $this->normalize($value);
      }
    }
    unset($value);
    if (!empty($schema['nullable'])) {
      unset($schema['nullable']);
      return ['anyOf' => [$schema, ['type' => 'null']]];
    }
    return $schema;
  }

}
