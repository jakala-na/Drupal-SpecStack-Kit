<?php

declare(strict_types=1);

namespace Drupal\specstack_hello_world\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the hello-world React CRUD demo block.
 *
 * @Block(
 *   id = "specstack_hello_world_demo",
 *   admin_label = @Translation("SpecStack hello-world CRUD demo"),
 *   category = @Translation("SpecStack")
 * )
 */
final class HelloWorldDemoBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $build = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['ssk-hello-world-block'],
        'data-specstack-react-app' => 'hello-world',
        'data-react-settings' => json_encode([
          'endpoint' => '/api/v1/hello-world',
        ], JSON_THROW_ON_ERROR),
      ],
      '#cache' => [
        'max-age' => 0,
      ],
    ];

    if (file_exists(DRUPAL_ROOT . '/themes/custom/specstack_theme/dist/js/react-app.js')) {
      $build['#attached']['library'][] = 'specstack_theme/react_app';
    }
    else {
      $build['fallback'] = [
        '#markup' => '<p class="ssk-hello-world-block__fallback">Run <code>ddev theme</code> to build the React app.</p>',
      ];
    }

    return $build;
  }

}
