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

use Code4Nix\ContaoSquareMystery\Controller\FrontendModule\SquareMysteryController;

/**
 * Frontend modules
 */
$GLOBALS['TL_DCA']['tl_module']['palettes'][SquareMysteryController::TYPE] = '
{title_legend},name,headline,type;
{template_legend:hide},customTpl;
{protected_legend:hide},protected;
{expert_legend:hide},guests,cssID
';
