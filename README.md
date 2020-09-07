# miro-email-picker

This is a completed frontend test assignment for Miro.

Full requirements for this task are [here](https://deniskaber.github.io/miro-email-picker/Frontend_test_assignment_Miro.pdf).

---
`miro-email-picker` is a simple control that lets the user enter multiple emails.

### Demo
Check online [demo](https://deniskaber.github.io/miro-email-picker/demo.html).

### Browsers support
EmailsPicker is supports IE 11 and the latest versions of Chrome, Safari, Firefox, Edge.

## Installation and usage
Bundle size is 5kb gzipped.

### `<script>` include
Import js bundle from `https://deniskaber.github.io/miro-email-picker/dist/main.js`.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://deniskaber.github.io/miro-email-picker/dist/main.js"></script>
</head>
<body>
    <div id="emails-input"></div>
    <script>
        const { addEmail, removeEmail, getValue, destroy } = EmailsPicker(document.getElementById('emails-input'));
    </script>
</body>
</html>
```

### npm

1. Add miro-email-picker to your project

`npm i @dberezin/miro-email-picker`

2. Start using it:
```javascript
import EmailsPicker from '@dberezin/miro-email-picker';

const { addEmail, removeEmail, getValue, destroy } = EmailsPicker(document.getElementById('emails-input'));
```

## API 

`EmailsPicker` returns an object with these methods:

-   `addEmail: (email: string) => void` - adds an email to the EmailsPicker instance
-   `removeEmail: (email: string) => void` - removes added email from the EmailsPicker instance
-   `getValue: () => string[]` - returns the list of added **valid** emails
-   `destroy: () => void` - removes the widget
