Laxy - Parallax Side Menu
=========================

What is it?
-----------

Laxy is a simple way to create sliding side menus for mobile. It takes existing
content and clones it into a side menu, which is styled with the provided CSS.

Installation
------------

Include the CSS and JS files to your website.

```
<link href='laxy.css' rel='stylesheet' type='text/css'>
<script src="jquery.laxy.js"></script>
```

Usage
-----

Example HTML, always use an id-attribute on the menu element:

```
<div id="menu">
    <p>...</p>
    <p>...</p>
    <p>...</p>
</div>
```

Initialize the menu with JS:

```javascript
$('#menu').laxy();
```

Configure options:

```javascript
$('#menu').laxy({
    option: value,
    option: value,
    push: [
        {
            element: '#element1',
            offset: false
        },
        {
            element: '#element2',
            offset: true
        }
    ]
});
```

Options
-------

| Option            | Type          | Default               | Description                                       |
| ----------------- | --------------| --------------------- | ------------------------------------------------- |
| container         | string        | 'body'                | Container for the menu and all pushed elements.   |
| trigger           | string        | selector + '-trigger' | Change the ID of open/close trigger for the menu. |
| rtl               | boolean       | false                 | Set to true to make menu appear from the right.   |
| wrappedID         | string        | 'laxy-wrapper'        | ID-attribute for the wrapper inside container.    |
| wrapperClass      | string        | 'laxy-wrapper'        | Class(es) for the wrapper.                        |
| menuClass         | string        | 'laxy-menu'           | Class(es) for the menu.                           |
| activeClass       | string        | 'laxy-menu-active'    | Class for active state.                           |
| ltrClass          | string        | 'laxy-menu-left'      | Class for menu appearing from left.               |
| rtlClass          | string        | 'laxy-menu-right'     | Class for menus appearing from right.             |
| triggerClass      | string        | 'laxy-menu-trigger'   | Class for the trigger.                            |
| closeClass        | string        | 'laxy-menu-close'     | Class for the close state of the trigger.         |
| cloneID           | string        | null                  | Custom id for the cloned menu.                    |
| cloneClass        | string        | null                  | Additional classes for the cloned menu.           |
| push              | array         | null                  | Array of elements that are pushed by the menu.    |
| beforeOpen        | function      | null                  | Callback for before the menu is opened.           |
| afterOpen         | function      | null                  | Callback for after the menu is opened.            |
| beforeClose       | function      | null                  | Callback for before the menu is closed.           |
| afterClose        | function      | null                  | Callback for after the menu is closed.            |

Dependencies
------------

jQuery 1.10

License
-------

Copyright (c) 2015 Timo Sundvik

Laxy is released under the MIT license.

Relax(y) and do whatever you want!