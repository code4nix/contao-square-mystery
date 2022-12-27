<?php

declare(strict_types=1);

/*
 * This file is part of Contao Square Mystery.
 *
 * (c) Marko Cupic 2022 <m.cupic@gmx.ch>
 * @license GPL-3.0-or-later
 * For the full copyright and license information,
 * please view the LICENSE file that was distributed with this source code.
 * @link https://github.com/code4nix/contao-square-mystery
 */

namespace Code4Nix\ContaoSquareMystery;

use Code4Nix\ContaoSquareMystery\DependencyInjection\Code4NixContaoSquareMysteryExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class Code4NixContaoSquareMystery extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

    public function getContainerExtension(): Code4NixContaoSquareMysteryExtension
    {
        return new Code4NixContaoSquareMysteryExtension();
    }

    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);
    }
}
