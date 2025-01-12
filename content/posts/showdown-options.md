---
title: "Showdown Options"
date: "2025-01-07"
description: "About showdown converter options"
ogImg: "ogp/posts/md.png"
tags:
  - "showdown"
  - "markdown"
---

Showdown Options can be set as follows

## Globally

Setting a "global" option affects all instances of showdown

```js
showdown.setOption("optionKey", "value");
```

## Locally

Setting a "local" option only affects the specified Converter object.
Local options can be set:

- **through the constructor**

  ```js
  var converter = new showdown.Converter({ optionKey: "value" });
  // example of multiple options
  var converter = new showdown.Converter({ tables: true, strikethrough: true });
  ```

- **through the setOption() method**
  ```js
  var converter = new showdown.Converter();
  converter.setOption("optionKey", "value");
  ```

# Getting an option

Showdown provides 2 methods (both local and global) to retrieve previous set options.

## getOption()

```js
// Global
var myOption = showdown.getOption("optionKey");

//Local
var myOption = converter.getOption("optionKey");
```

## getOptions()

```js
// Global
var showdownGlobalOptions = showdown.getOptions();

//Local
var thisConverterSpecificOptions = converter.getOptions();
```

### Retrieve the default options

You can get showdown's default options with:

```js
var defaultOptions = showdown.getDefaultOptions();
```

# Valid Options

Please note that until version 1.6.0, all of these options are **_DISABLED_** by default in the cli tool.

## omitExtraWLInCodeBlocks

|  type   | default | since | description                               |
| :-----: | :-----: | :---: | :---------------------------------------- |
| boolean |  false  | 1.0.0 | Omit the trailing newline in a code block |

By default, showdown adds a newline before the closing tags in code blocks. By enabling this option, that newline is removed.  
This option affects both indented and fenced (gfm style) code blocks.

### Example:

**input**:

```md
    var foo = 'bar';
```

**omitExtraWLInCodeBlocks** = false:

```html
<code>
  <pre>
var foo = 'bar';
</pre
  >
</code>
```

**omitExtraWLInCodeBlocks** = true:

```html
<code><pre>var foo = 'bar';</pre></code>
```

## noHeaderId

|  type   | default | since | description                                    |
| :-----: | :-----: | :---: | :--------------------------------------------- |
| boolean |  false  | 1.1.0 | Disable the automatic generation of header ids |

Showdown generates an id for headings automatically. This is useful for linking to a specific header.
This behavior, however, can be disabled with this option.

### Example

**input**:

```md
# This is a header
```

**noHeaderId** = false

```html
<h1 id="thisisaheader">This is a header</h1>
```

**noHeaderId** = true

```html
<h1>This is a header</h1>
```

NOTE: Setting to true overrides **[prefixHeaderId][]** and **[ghCompatibleHeaderId]** options

## ghCompatibleHeaderId

|  type   | default | since | description                                      |
| :-----: | :-----: | :---: | :----------------------------------------------- |
| boolean |  false  | 1.5.5 | Generate header ids compatible with github style |

This changes the format of the generated header IDs: spaces are replaced with dashes and a bunch of non alphanumeric chars are removed.

### Example

**input**:

```md
# This is a header with @#$%
```

**ghCompatibleHeaderId** = false

```html
<h1 id="thisisaheader">This is a header</h1>
```

**ghCompatibleHeaderId** = true

```html
<h1 id="this-is-a-header-with-">This is a header with @#$%</h1>
```

## prefixHeaderId

|       type        | default | since | description                              |
| :---------------: | :-----: | :---: | :--------------------------------------- |
| string \| boolean |         | 1.0.0 | Add a prefix to the generated header ids |

Adds a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to `true` will add a generic 'section' prefix.

## headerLevelStart

|  type   | default | since | description                   |
| :-----: | :-----: | :---: | :---------------------------- |
| integer |    1    | 1.1.0 | Set the header starting level |

Sets the level from which header tags should start

**input**:

```md
# header
```

**headerLevelStart** = 1

```html
<h1>header</h1>
```

**headerLevelStart** = 3

```html
<h3>header</h3>
```

## parseImgDimensions

|  type   | default | since | description                                                             |
| :-----: | :-----: | :---: | :---------------------------------------------------------------------- |
| boolean |  false  | 1.1.0 | Enable support for setting image dimensions from within markdown syntax |

Enables support for setting image dimensions from within markdown syntax.

```md
![foo](foo.jpg =100x80) simple, assumes units are in px
![bar](bar.jpg =100x\*) sets the height to "auto"
![baz](baz.jpg =80%x5em) Image with width of 80% and height of 5em
```

## simplifiedAutoLink

|  type   | default | since | description                                 |
| :-----: | :-----: | :---: | :------------------------------------------ |
| boolean |  false  | 1.2.0 | Enable automatic linking in plain text urls |

Turning this option on will enable automatic linking when the parser find plain text urls

**input**:

```md
some text www.google.com
```

**simplifiedAutoLink** = false

```html
<p>some text www.google.com</p>
```

**simplifiedAutoLink** = true

```html
<p>some text <a href="www.google.com">www.google.com</a></p>
```

## excludeTrailingPunctuationFromURLs

|  type   | default | since | description                                        |
| :-----: | :-----: | :---: | :------------------------------------------------- |
| boolean |  false  | 1.5.1 | Excludes trailing punctuation from autolinked urls |

Excludes the follow characters from links: `. !  ? ( )`
This option only applies to links generated by **[simplifiedAutoLink][]**.

**input**:

```md
check this link www.google.com.
```

**excludeTrailingPunctuationFromURLs** = false

```html
<p>check this link <a href="www.google.com">www.google.com.</a></p>
```

**excludeTrailingPunctuationFromURLs** = true

```html
<p>check this link <a href="www.google.com">www.google.com</a>.</p>
```

## literalMidWordUnderscores

|  type   | default | since | description                                                 |
| :-----: | :-----: | :---: | :---------------------------------------------------------- |
| boolean |  false  | 1.2.0 | Treats underscores in middle of words as literal characters |

Underscores are _magic characters_ in markdown (as they delimit words that should be emphasised).
Turning this on will stop showdown from interpreting underscores in the middle of words as `<em>` and `<strong>` and instead treat them as literal underscores.

**input**:

```md
some text with**underscores**in middle
```

**literalMidWordUnderscores** = false

```html
<p>some text with<strong>underscores</strong>in middle</p>
```

**literalMidWordUnderscores** = true

```html
<p>some text with__underscores__in middle</p>
```

## strikethrough

|  type   | default | since | description                             |
| :-----: | :-----: | :---: | :-------------------------------------- |
| boolean |  false  | 1.2.0 | Enable support for strikethrough syntax |

Enables support for strikethrough (`<del>`)

**syntax**:

```md
~~strikethrough~~
```

```html
<del>strikethrough</del>
```

## tables

|  type   | default | since | description                      |
| :-----: | :-----: | :---: | :------------------------------- |
| boolean |  false  | 1.2.0 | Enable support for tables syntax |

Enables support for table syntax.

**syntax**:

```md
| h1    |   h2    |      h3 |
| :---- | :-----: | ------: |
| 100   | [a][1]  | ![b][2] |
| _foo_ | **bar** | ~~baz~~ |
```

## tablesHeaderId\*\*:

|  type   | default | since | description                                      |
| :-----: | :-----: | :---: | :----------------------------------------------- |
| boolean |  false  | 1.2.0 | Enable automatic generation of table headers ids |

If enabled, generates automatic ids for table headers. Only applies if **[tables][]** is enabled.

## ghCodeBlocks

|  type   | default | since | description                                                        |
| :-----: | :-----: | :---: | :----------------------------------------------------------------- |
| boolean |  true   | 1.2.0 | Enable support for GFM code block style syntax (fenced codeblocks) |

**syntax**:

```md
some code here
```

NOTE: ghCodeBlocks are enabled by default since version 0.3.1

## tasklists\*\*:(boolean) [default false] Enable support for GFM takslists. Example:

|  type   | default | since | description                      |
| :-----: | :-----: | :---: | :------------------------------- |
| boolean |  false  | 1.2.0 | Enable support for GFM takslists |

Enables support for github style tasklists

**syntax**:

```md
- [x] This task is done
- [ ] This is still pending
```

## ghMentions

|  type   | default | since | description                         |
| :-----: | :-----: | :---: | :---------------------------------- |
| boolean |  false  | 1.6.0 | Enable support for github @mentions |

Enables support for github @mentions, which links to the github profile page of the username mentioned

**input**:

```md
hello there @tivie
```

**ghMentions** = false

```html
<p>hello there @tivie</p>
```

**ghMentions** = true

```html
<p>hello there <a href="https://www.github.com/tivie>@tivie</a></p>
```

## ghMentionsLink

|  type   |         default          | since | description                        |
| :-----: | :----------------------: | :---: | :--------------------------------- |
| boolean | `https://github.com/{u}` | 1.6.2 | Set link @mentions should point to |

Changes the link generated by @mentions. `{u}` is replaced by the text of the mentions. Only applies if **[ghMentions][]** is enabled.

**input**:

```md
hello there @tivie
```

**ghMentionsLink** = https://github.com/{u}

```html
<p>hello there <a href="https://www.github.com/tivie>@tivie</a></p>
```

**ghMentionsLink** = http://mysite.com/{u}/profile

```html
<p>hello there <a href="//mysite.com/tivie/profile">@tivie</a></p>
```

## smoothLivePreview

|  type   | default | since | description                                       |
| :-----: | :-----: | :---: | :------------------------------------------------ |
| boolean |  false  | 1.2.1 | Fix weird effects due to parsing incomplete input |

On some circumstances, in live preview editors, when a paragraph is followed by a list it can cause an awkward effect.



You can prevent this by enabling this option

## smartIndentationFix

|  type   | default | since | description                                                                            |
| :-----: | :-----: | :---: | :------------------------------------------------------------------------------------- |
| boolean |  false  | 1.4.2 | Fix indentation problems related to es6 template strings in the midst of indented code |

Tries to smartly fix indentation problems related to es6 template strings in the midst of indented code

## disableForced4SpacesIndentedSublists

|  type   | default | since | description                                                                     |
| :-----: | :-----: | :---: | :------------------------------------------------------------------------------ |
| boolean |  false  | 1.5.0 | Disable the requirement of indenting sublists by 4 spaces for them to be nested |

Disables the requirement of indenting sublists by 4 spaces for them to be nested, effectively reverting to the old behavior where 2 or 3 spaces were enough.

**input**:

```md
- one
  - two

...

- one
  - two
```

**disableForced4SpacesIndentedSublists** = false

```html
<ul>
  <li>one</li>
  <li>two</li>
</ul>
<p>...</p>
<ul>
  <li>
    one
    <ul>
      <li>two</li>
    </ul>
  </li>
</ul>
```

**disableForced4SpacesIndentedSublists** = true

```html
<ul>
  <li>
    one
    <ul>
      <li>two</li>
    </ul>
  </li>
</ul>
<p>...</p>
<ul>
  <li>
    one
    <ul>
      <li>two</li>
    </ul>
  </li>
</ul>
```

## simpleLineBreaks

|  type   | default | since | description                                                   |
| :-----: | :-----: | :---: | :------------------------------------------------------------ |
| boolean |  false  | 1.5.1 | Parse line breaks as `<br/>` in paragraphs (like GitHub does) |

Every newline character inside paragraphs and spans is parsed as `<br/>`

**input**:

```md
a line
wrapped in two
```

**simpleLineBreaks** = false

```html
<p>a line wrapped in two</p>
```

**simpleLineBreaks** = true

```html
<p>
  a line<br />
  wrapped in two
</p>
```

## requireSpaceBeforeHeadingText

|  type   | default | since | description                                  |
| :-----: | :-----: | :---: | :------------------------------------------- |
| boolean |  false  | 1.5.3 | Require a spance between `#` and header text |

Makes adding a space between `#` and the header text mandatory.

**input**:

```md
#header
```

**requireSpaceBeforeHeadingText** = false

```html
<h1 id="header">header</h1>
```

**simpleLineBreaks** = true

```html
<p>#header</p>
```

## encodeEmails

|  type   | default | since | description                                 |
| :-----: | :-----: | :---: | :------------------------------------------ |
| boolean |  true   | 1.6.1 | Enable e-mail address automatic obfuscation |

Enables e-mail addresses encoding through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities. (since v1.6.1)

NOTE: Prior to version 1.6.1, emails would always be obfuscated through dec and hex encoding.

**input**:

```md
<myself@example.com>
```

**encodeEmails** = false

```html
<a href="mailto:myself@example.com">myself@example.com</a>
```

**encodeEmails** = true

```html
<a
  href="&#109;&#97;&#105;&#108;t&#x6f;&#x3a;&#109;&#x79;s&#x65;&#x6c;&#102;&#64;&#x65;xa&#109;&#112;&#108;&#101;&#x2e;c&#x6f;&#109;"
  >&#x6d;&#121;s&#101;&#108;f&#x40;&#x65;&#120;a&#x6d;&#x70;&#108;&#x65;&#x2e;&#99;&#x6f;&#109;</a
>
```

[prefixHeaderId]: #prefixheaderid
[ghCompatibleHeaderId]: #ghcompatibleheaderid
[simplifiedAutoLink]: #simplifiedautolink
[tables]: #tables
[ghMentions]: #ghmentions

