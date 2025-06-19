# Blaze Programming Language

A custom programming language designed for web backend development, system programming, scripting, and education.

## Features

- **Simple Syntax**: Easy to learn and understand
- **Multiple Use Cases**: Backend web development, system programming, scripting, and educational purposes
- **Memory Management**: Built-in data storage and retrieval system
- **Built-in Functions**: Print, input, type conversion, and utility functions
- **Interactive REPL**: Test code interactively

## Installation

1. Ensure you have Python 3.6+ installed
2. Clone or download the Blaze interpreter files
3. Run Blaze programs using the command line interface

## Usage

### Running Blaze Files

```bash
python blaze.py examples/hello_world.blaze
```

### Interactive REPL

```bash
python blaze.py
```

### Creating New Apps

```bash
python blaze.py new my_app
```

### Compiling to Executable

```bash
# Compile current app directory
python blaze.py compile

# Compile specific file
python blaze.py compile my_script.blaze
```

### Getting Help

```bash
python blaze.py --help
```

## Syntax

### Variables and Data Types

```blaze
// Numbers
number = 42
pi = 3.14159

// Text (Strings)
name = "Blaze"
message = 'Hello World'

// Boolean
is_active = true
is_complete = false
```

### Print Function

```blaze
text = "Hello world"
print(text)
print("Multiple", "arguments", "work", "too")
```

### Memory Storage

```blaze
// Store data in memory
data(username = "Alice")
data(age = 25)

// Load from memory using @
current_user = @username
user_age = @age
print("User:", current_user, "Age:", user_age)
```

### Comments

```blaze
// This is a single-line comment
text = "Code here"  // Comments can be at end of line
```

### Built-in Functions

- `print(...)` - Output text and values
- `input(prompt)` - Get user input
- `len(object)` - Get length of strings/objects
- `str(value)` - Convert to string
- `int(value)` - Convert to integer
- `float(value)` - Convert to float
- `type(value)` - Get type of value
- `range(start, stop, step)` - Generate number ranges

### Examples

#### Basic Hello World
```blaze
text = "Hello world"
print(text)
```

#### User Interaction
```blaze
name = input("What's your name? ")
print("Hello,", name, "!")
```

#### Working with Memory
```blaze
data(config = "production")
environment = @config
print("Running in:", environment)
```

#### Type Checking
```blaze
value = 42
print("Type of value:", type(value))
```

## Language Philosophy

### Purpose
- **Web Backend**: Build server-side applications
- **System Programming**: Create native-level applications with web emulation capabilities
- **Scripting**: Automate tasks and processes
- **Education**: Teach programming concepts with simple, clear syntax

### Design Principles
- **Simplicity**: Easy to read and write
- **User Customization**: Extensible and configurable
- **Memory Management**: Built-in data persistence within programs
- **Educational Focus**: Clear syntax that helps learners understand programming concepts

## File Structure

```
Blaze/
├── blaze.py                 # Main CLI interface
├── blaze_interpreter.py     # Core interpreter
├── blaze_builtins.py       # Built-in functions
├── examples/
│   └── hello_world.blaze   # Example programs
└── README.md               # This file
```

## Data Types

| Type | Description | Example |
|------|-------------|---------|
| Number | Integers and floats | `42`, `3.14` |
| Text | Strings | `"Hello"`, `'World'` |
| Boolean | True/false values | `true`, `false` |

## Future Features

- Control flow (if/else/finally statements)
- Custom types (alternative to classes)
- Function definitions
- Modules and imports
- File I/O operations
- Network operations for web backend
- Extended standard library

## Contributing

This is a custom language implementation. Feel free to extend it with additional features, improve the parser, or add new built-in functions.

## License

Open source - feel free to use and modify for educational and development purposes.
