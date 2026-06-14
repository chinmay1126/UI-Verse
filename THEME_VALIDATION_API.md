# Theme Validation API - Semantic Color Error Granularity

**Version:** 1.0.1 | **Last Updated:** June 15, 2026

## Overview

The UIverse Theme Validation API provides comprehensive validation workflows for theme objects with **semantic error granularity for color processing failures**. This update introduces 6 new error codes that precisely identify the specific failure type when color validation fails, enabling backend consumers to implement intelligent error recovery and remediation strategies.

## Table of Contents

1. [New Features (v1.0.1)](#new-features-v101)
2. [Semantic Error Codes](#semantic-error-codes)
3. [Color Processing Guide](#color-processing-guide)
4. [API Endpoints](#api-endpoints)
5. [Error Handling](#error-handling)
6. [Integration Examples](#integration-examples)
7. [Migration Guide](#migration-guide)

---

## New Features (v1.0.1)

### Semantic Color Error Granularity

The updated validator now returns specific, actionable error codes when color validation fails:

| Error Code | Semantic Meaning | Recovery Strategy |
|---|---|---|
| `COLOR_FORMAT_MISMATCH` | Color provided in unsupported format (HSL, Lab, etc.) | Convert to supported format (hex or RGB) |
| `COLOR_PARSE_ERROR` | Color string syntax is malformed | Fix string syntax; verify correct format |
| `COLOR_SPACE_INCOMPATIBLE` | Color exists in wrong color space context | Convert color space to RGB |
| `RGB_COMPONENT_OUT_OF_RANGE` | RGB component value outside [0-255] range | Clamp values to valid range |
| `HEX_DIGIT_INVALID` | Hex color contains non-hexadecimal characters | Replace invalid digits with valid hex chars |
| `COLOR_NORMALIZATION_FAILED` | Color could not be normalized to canonical format | Verify color space compatibility |

### Enhanced Error Metadata

All color validation errors now include a `colorDetails` object with:

- **attemptedFormat:** The format the validator tried to parse
- **expectedFormats:** Array of supported formats
- **colorValue:** The actual color string that failed
- **failureReason:** Specific reason for the failure
- **colorSpace:** Detected or expected color space
- **suggestion:** Recommended remediation action

---

## Semantic Error Codes

### COLOR_FORMAT_MISMATCH (422 Unprocessable Entity)

**Description:** Color provided in unsupported format

**When it occurs:**
- HSL format: `hsl(240, 100%, 50%)`
- Lab color space: `lab(50 30 40)`
- LCH format: `lch(50 30 40)`
- Any unrecognized format

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.primary",
      "message": "HSL color space not compatible with RGB-only theme",
      "code": "COLOR_FORMAT_MISMATCH",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "hsl",
        "expectedFormats": ["hex-3", "hex-6", "hex-8", "rgb", "rgba"],
        "colorValue": "hsl(240, 100%, 50%)",
        "failureReason": "Format does not match any supported color format",
        "suggestion": "Use hex (#RRGGBB), hex with alpha (#RRGGBBAA), or rgb(r, g, b) format"
      }
    }
  ]
}
```

**Recovery:** Convert HSL to hex or RGB format before submitting.

---

### COLOR_PARSE_ERROR (422 Unprocessable Entity)

**Description:** Color string syntax is malformed

**When it occurs:**
- Invalid hex digit characters
- Malformed RGB syntax
- Incomplete color specification
- Invalid string encoding

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.secondary",
      "message": "RGB color format invalid",
      "code": "COLOR_PARSE_ERROR",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "rgb",
        "expectedFormats": ["rgb", "rgba"],
        "colorValue": "rgb(255, 256, 100)",
        "failureReason": "Invalid RGB syntax or component out of bounds",
        "suggestion": "Use rgb(r, g, b) or rgba(r, g, b, a) format with values 0-255"
      }
    }
  ]
}
```

**Recovery:** Fix RGB syntax and ensure values are valid.

---

### COLOR_SPACE_INCOMPATIBLE (422 Unprocessable Entity)

**Description:** Color exists in wrong color space context

**When it occurs:**
- Lab or LCH color space provided (RGB theme)
- CMYK color space provided
- Device-dependent color spaces
- Color space mismatch between theme definition and consumer expectations

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.accent",
      "message": "Lab color space not compatible with RGB-only theme",
      "code": "COLOR_SPACE_INCOMPATIBLE",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "lab",
        "expectedFormats": ["hex-3", "hex-6", "hex-8", "rgb", "rgba"],
        "colorSpace": "Lab",
        "failureReason": "Theme requires RGB color space",
        "suggestion": "Convert Lab color to hex or rgb format"
      }
    }
  ]
}
```

**Recovery:** Convert from Lab to RGB color space.

---

### RGB_COMPONENT_OUT_OF_RANGE (422 Unprocessable Entity)

**Description:** RGB component value outside valid range [0-255]

**When it occurs:**
- Red, green, or blue component < 0 or > 255
- Alpha channel outside [0, 1] for rgba
- Numeric overflow or underflow
- Float values used where integers expected

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.secondary",
      "message": "RGB component value 300 out of range [0-255]",
      "code": "RGB_COMPONENT_OUT_OF_RANGE",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "rgb",
        "colorValue": "rgb(300, 50, 100)",
        "failureReason": "Red component 300 exceeds valid range [0-255]",
        "suggestion": "Ensure all RGB components are between 0 and 255"
      }
    }
  ]
}
```

**Recovery:** Clamp RGB values to [0, 255] range.

---

### HEX_DIGIT_INVALID (422 Unprocessable Entity)

**Description:** Hex color contains invalid hexadecimal digit characters

**When it occurs:**
- Invalid hex digits (not 0-9, a-f, A-F)
- Common typos like G, H, X, Y, Z in hex values
- Mixed case without proper formatting
- Wrong number of digits

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.primary",
      "message": "Hex color '#XXYYZZ' contains invalid digits",
      "code": "HEX_DIGIT_INVALID",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "hex-6",
        "expectedFormats": ["hex-3", "hex-6", "hex-8"],
        "colorValue": "#XXYYZZ",
        "failureReason": "Invalid hexadecimal digits: X, Y, Z",
        "suggestion": "Use valid hex digits (0-9, a-f) and ensure format is #RGB, #RRGGBB, or #RRGGBBAA"
      }
    }
  ]
}
```

**Recovery:** Replace invalid hex digits with valid characters (0-9, a-f).

---

### COLOR_NORMALIZATION_FAILED (422 Unprocessable Entity)

**Description:** Color could not be normalized to canonical format

**When it occurs:**
- Color space conversion fails
- Precision loss during normalization
- Ambiguous color specification
- Unsupported color space in conversion chain

**Example Response:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.tertiary",
      "message": "Unable to normalize color due to ambiguous format specification",
      "code": "COLOR_NORMALIZATION_FAILED",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "mixed",
        "expectedFormats": ["hex-3", "hex-6", "hex-8", "rgb", "rgba"],
        "colorValue": "rgb(255, 50, 100, 0.5, extra)",
        "failureReason": "Conversion between color spaces failed",
        "suggestion": "Verify color format is valid and unambiguous; convert to standard format"
      }
    }
  ]
}
```

**Recovery:** Verify color format and convert to standard format.

---

## Color Processing Guide

### Supported Color Formats

#### Hex Colors

| Format | Pattern | Example | Normalized |
|---|---|---|---|
| 3-digit | `#RGB` | `#F0A` | `#FF00AA` |
| 6-digit | `#RRGGBB` | `#FF00AA` | `#FF00AA` |
| 8-digit | `#RRGGBBAA` | `#FF00AACC` | `#FF00AACC` |

#### RGB/RGBA Colors

| Format | Pattern | Example | Supported |
|---|---|---|---|
| RGB | `rgb(r, g, b)` | `rgb(255, 0, 170)` | ✓ |
| RGBA | `rgba(r, g, b, a)` | `rgba(255, 0, 170, 0.8)` | ✓ |

**Component Ranges:**
- Red, Green, Blue: `0-255`
- Alpha: `0-1` (0 = fully transparent, 1 = fully opaque)

### Unsupported Formats

| Format | Example | Alternative |
|---|---|---|
| HSL | `hsl(240, 100%, 50%)` | Convert to hex: `#0000FF` |
| HSV | `hsv(240, 100%, 100%)` | Convert to hex: `#0000FF` |
| Lab | `lab(50 30 40)` | Convert to hex: `#7F5347` |
| LCH | `lch(50 30 40)` | Convert to hex: `#7F5347` |
| CMYK | `cmyk(0, 100, 100, 0)` | Convert to hex: `#FF0000` |

---

## API Endpoints

### POST /api/themes/validate

**Validate Single Theme**

Validates a theme object with detailed color error reporting.

**Request:**

```json
{
  "id": "custom-light",
  "name": "Custom Light Theme",
  "isDark": false,
  "colors": {
    "primary": "#6c5ce7",
    "secondary": "#00cec9",
    "accent": "#eb6835",
    "background": "#f5f4f2",
    "surface": "#ffffff",
    "text": {
      "primary": "#111111",
      "secondary": "#666666"
    }
  }
}
```

**Response (Success):**

```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "metadata": {
    "timestamp": "2026-06-15T10:30:45.123Z",
    "validator": "1.0.1",
    "errorCount": 0,
    "warningCount": 0,
    "validationDuration": 12
  }
}
```

**Response (With Semantic Errors):**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "colors.primary",
      "message": "Hex color '#XXYYZZ' contains invalid digits",
      "code": "HEX_DIGIT_INVALID",
      "severity": "error",
      "colorDetails": {
        "attemptedFormat": "hex-6",
        "expectedFormats": ["hex-3", "hex-6", "hex-8"],
        "colorValue": "#XXYYZZ",
        "failureReason": "Invalid hexadecimal digits: X, Y, Z",
        "suggestion": "Use valid hex digits (0-9, a-f)"
      }
    }
  ],
  "warnings": [],
  "metadata": {
    "timestamp": "2026-06-15T10:30:45.123Z",
    "validator": "1.0.1",
    "errorCount": 1,
    "warningCount": 0,
    "validationDuration": 8
  }
}
```

---

### POST /api/themes/validate-color

**Validate Color Value**

Validates a single color with detailed processing information.

**Request:**

```json
{
  "color": "#FF5733",
  "strict": true
}
```

**Response:**

```json
{
  "valid": true,
  "color": "#FF5733",
  "format": "hex",
  "normalized": "#FF5733",
  "contrast": {
    "white": 3.45,
    "black": 5.89
  },
  "wcagCompliance": {
    "wcagAA": true,
    "wcagAAA": false
  },
  "colorSpace": "RGB",
  "processingDetails": {
    "normalizationApplied": false,
    "originalFormat": "hex"
  }
}
```

---

### POST /api/themes/validate-batch

**Validate Multiple Themes**

Batch validate multiple theme objects in a single request.

**Request:**

```json
{
  "themes": [
    {
      "id": "theme-1",
      "name": "Light Theme",
      "isDark": false,
      "colors": { "primary": "#000000", "background": "#FFFFFF", "surface": "#FFFFFF", "text": { "primary": "#111111", "secondary": "#666666" } }
    },
    {
      "id": "theme-2",
      "name": "Dark Theme",
      "isDark": true,
      "colors": { "primary": "#FFFFFF", "background": "#000000", "surface": "#111111", "text": { "primary": "#FFFFFF", "secondary": "#CCCCCC" } }
    }
  ],
  "stopOnFirst": false
}
```

**Response:**

```json
{
  "results": [
    {
      "themeId": "theme-1",
      "validation": { "valid": true, "errors": [], "warnings": [] }
    },
    {
      "themeId": "theme-2",
      "validation": { "valid": true, "errors": [], "warnings": [] }
    }
  ],
  "summary": {
    "total": 2,
    "valid": 2,
    "invalid": 0,
    "totalErrors": 0,
    "totalWarnings": 0
  }
}
```

---

## Error Handling

### Error Code Mapping

Use error codes to implement intelligent error handling:

```javascript
const colorErrorHandlers = {
  'HEX_DIGIT_INVALID': async (error) => {
    // Provide hex digit replacement suggestions
    const corrected = await suggestHexCorrection(error.colorDetails.colorValue);
    return corrected;
  },
  'RGB_COMPONENT_OUT_OF_RANGE': async (error) => {
    // Clamp values to valid range
    const clamped = clampRgbComponents(error.colorDetails.colorValue);
    return clamped;
  },
  'COLOR_SPACE_INCOMPATIBLE': async (error) => {
    // Convert color space
    const converted = await convertColorSpace(
      error.colorDetails.colorValue,
      error.colorDetails.colorSpace,
      'RGB'
    );
    return converted;
  },
  'COLOR_PARSE_ERROR': async (error) => {
    // Log and request user input
    console.error('Parse error:', error.colorDetails.failureReason);
    return await requestColorInput();
  }
};
```

### Batch Error Handling

```javascript
async function validateAndRecoverThemes(themes) {
  const result = await api.validateBatch(themes);
  
  const recovered = [];
  for (const themeResult of result.results) {
    if (themeResult.validation.valid) {
      recovered.push(themeResult);
      continue;
    }

    // Process each error with semantic recovery
    for (const error of themeResult.validation.errors) {
      if (error.code === 'HEX_DIGIT_INVALID') {
        const fixed = fixHexColor(error.colorDetails);
        themeResult.validation.errors = [];
        recovered.push(themeResult);
      }
    }
  }

  return recovered;
}
```

---

## Integration Examples

### JavaScript/Node.js

```javascript
const ThemeValidator = require('./theme-validator.js');

const validator = new ThemeValidator({
  strictMode: true,
  enableAccessibilityAnalysis: true,
  enableCaching: true
});

// Validate theme with semantic error handling
const theme = {
  id: 'my-theme',
  name: 'My Custom Theme',
  isDark: false,
  colors: {
    primary: '#6c5ce7',
    secondary: '#XXYYZZ',  // Invalid hex
    accent: 'hsl(30, 100%, 50%)',  // Unsupported format
    background: '#f5f4f2',
    surface: '#ffffff',
    text: { primary: '#111111', secondary: '#666666' }
  }
};

const result = validator.validate(theme);

// Handle semantic errors
if (!result.valid) {
  for (const error of result.errors) {
    switch (error.code) {
      case 'HEX_DIGIT_INVALID':
        console.log(`Fix hex digits: ${error.colorDetails.suggestion}`);
        break;
      case 'COLOR_FORMAT_MISMATCH':
        console.log(`Convert format: ${error.colorDetails.suggestion}`);
        break;
      case 'RGB_COMPONENT_OUT_OF_RANGE':
        console.log(`Clamp values: ${error.colorDetails.suggestion}`);
        break;
    }
  }
}
```

### Python

```python
import json
import requests

# Validate theme via HTTP
theme = {
    'id': 'my-theme',
    'name': 'My Custom Theme',
    'isDark': False,
    'colors': {
        'primary': '#6c5ce7',
        'secondary': '#XXYYZZ',
        'accent': 'hsl(30, 100%, 50%)',
        'background': '#f5f4f2',
        'surface': '#ffffff',
        'text': {
            'primary': '#111111',
            'secondary': '#666666'
        }
    }
}

response = requests.post(
    'http://localhost:3000/api/themes/validate',
    json=theme,
    headers={'Content-Type': 'application/json'}
)

result = response.json()

# Handle semantic color errors
for error in result.get('errors', []):
    if error['code'] == 'HEX_DIGIT_INVALID':
        print(f"Error: {error['message']}")
        print(f"Invalid digits: {error['colorDetails']['failureReason']}")
        print(f"Suggestion: {error['colorDetails']['suggestion']}")
    elif error['code'] == 'COLOR_FORMAT_MISMATCH':
        print(f"Unsupported format: {error['colorDetails']['attemptedFormat']}")
        print(f"Use: {error['colorDetails']['expectedFormats']}")
```

---

## Migration Guide (v1.0 → v1.0.1)

### Breaking Changes

**None.** The update is backward compatible.

### New Error Codes to Handle

Add handling for 6 new semantic error codes:

1. `COLOR_FORMAT_MISMATCH`
2. `COLOR_PARSE_ERROR`
3. `COLOR_SPACE_INCOMPATIBLE`
4. `RGB_COMPONENT_OUT_OF_RANGE`
5. `HEX_DIGIT_INVALID`
6. `COLOR_NORMALIZATION_FAILED`

### Updated Response Schema

Error objects now include optional `colorDetails` field:

```json
{
  "field": "colors.primary",
  "message": "...",
  "code": "HEX_DIGIT_INVALID",
  "severity": "error",
  "colorDetails": {
    "attemptedFormat": "hex-6",
    "expectedFormats": ["hex-3", "hex-6", "hex-8"],
    "colorValue": "#XXYYZZ",
    "failureReason": "...",
    "suggestion": "..."
  }
}
```

### Recommended Updates

1. Update error handling to check for new error codes
2. Add `colorDetails` field parsing in error handlers
3. Implement semantic recovery strategies per error type
4. Update documentation for users of your API

---

## Conclusion

Semantic color error granularity enables backend integrations to:
- Distinguish between different types of color validation failures
- Implement intelligent error recovery without custom parsing
- Provide clear remediation guidance to end users
- Build composable color processing pipelines

For questions or issues, please open an issue on GitHub.
