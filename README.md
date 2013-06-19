jQuery.maxLines
===============

A jQuery Plug-in to limit the number of visible lines of text in a given element.

## Usage:

	.maxLines( maxLines [, paddingCompensation ] )

## Options:

#### maxLines: Number
*Required*

The number of lines you'd like to limit your text to.

#### paddingCompensation: Boolean

*Optional - Defaults to `true`*

Set to `false` if you **do not** want `padding-bottom` (which gets removed) added to the `margin-bottom` to compensate and keep consistent spacing.