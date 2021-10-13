# The main elements of Javascript

- Values: e.g. `123`, `"abc"`, `[4,5,6]`, `true`, `false`
- Operators: e.g. `+`, `-`, `+=`, `=`, the `[]` in `someArray[1]`
- Attributes: e.g. the `length` of a string, as in `someString.length`.
- Variables: a way of giving a value a name.
- Functions: another named thing and our main way of building up programs
- Control constructs: e.g. `if`, `for`, `while`.
- Methods: A special kind of function.

## Values

Values are the actual things stored in the computer's memory. Different kinds of values are stored in a different ways but in a high-level language like Javascript we don't need to care about exactly how.

The kinds of values you need for JS 1-10 and 11-20 are:

- Numbers: what you would expect. `1`, `2`, `3`, `3.141592653589793`, etc.
- Strings: a piece of text, e.g. `"foo"`. Can also think of it as a sequence of individual characters.
- Booleans: one of two values `true` or `false`.
- Arrays: A simple collection of other values, e.g. `[1, 2, 3]` is an array of three numbers, `["foo", "bar", "baz"]` is an array of three strings, and `[1, "foo", true]` is an array of a number, a string, and a boolean.


## Operators

Since we don't have to worry about exactly how values are represented in the computer's memory, the best way to describe different kinds of values (e.g. numbers vs strings) is by describing what we can do with them. At the most basic level that is defined by the _operations_ that we can perform on different kinds of values to produce other values.

Operators are the ways of producing values from other values or, in same cases, of manipulating values. For operators that produce new values we can use the arrow symbol, ⟹, to mean "evaluates to" to illustrate how different operators on different kinds of values produce new values.

For instance, `+`, `-`, `*`, and `/` are all operators that can be applied to two numbers to produce a new number, according to the normal mathematical definition.

```
1 + 2 ⟹ 3
7 - 3 ⟹ 4
4 * 10 ⟹ 40
50.3 / 13.2 ⟹ 3.8106060606060606
```

The `+` operator can also be applied to string valuesbut has a different meaning for strings than for numbers, producing the result of concatenating (a.k.a. smooshing together) the two strings.

```
"foo" + "bar" ⟹ "foobar"
"This is " + " a sentence." ⟹ "This is a sentence."
```

The `*` operator is not meaningful when applied to strings in Javascript. But strings support another operator that numbers do not, namely the `[]` operator that allows us to access the individual characters of a string specified with a numeric "index", where 0 is the index of the first element.

```
"abc"[0] ⟹ "a"
"abc"[1] ⟹ "b"
"abc"[2] ⟹ "c"
```

The `[]` operator also works on arrays:

```
[32, 43, 54][0] ⟹ 32
["foo", "bar", "baz"][2] ⟹ "baz"
```

## Attributes

Some values in Javascript have other named values attached to them. We'll get into this more when we get into Object Oriented programming but for now the main attribute you need to know about is the `length` attribute of strings and array values which is always a number telling us the number of characters in a string or the number of elements in an array.

```
"foobar".length ⟹ 6
[10, 20, 30, 40, 50].length ⟹ 5
```

This attribute is particularly useful because one less than the length of a string or array is the last useful index.

```
"abc"["abc".length - 1] ⟹ "c"
```

## Variables

While values are what is actually stored in the computers memory, often we want to be able to refer to a value without specifying a particular value, sometimes just because it's useful to use human-understandable names and sometimes because the same piece of code can describe a way of producing a value that doesn't depend on the exact values. For instance, if we write:

```
x * 2 ⟹ ???
```

we can't know what value it will produce until we know the value of `x`. `x` is not a value itself but rather a _name_ that can refer to a value. The exact rules for the form of names are a bit more complicated but for our purposes, names must start with a letter and can contain only letters, digits, and underscore (`_`). Names are case sensitive so `foo`,  `FOO`, and `Foo` are three different names.

We can set the value that a variable refers to with the assignment operator `=`. The assignment operator is a funny kind of operator that is not typically used for the value it produces but rather for it's ability to assign a value to a name.

```
x = 10
x * 2 ⟹ 20
```

Once we have assigned a value to a variable, we can use that variable to refer to the value anywhere we could use the value itself.

```
i = 2
numbers = [10, 20, 30, 40]
numbers[i] ⟹ 30
```

That also includes in expressions that we when turn around and assign back to the same variable:

```
x = 10
x ⟹ 10
x = x + 1
x ⟹ 11
```

Because assigning the value of a variable with something added to it is a relatively common thing to want to do, there are two special assignment operators that change the value of a variable using it's current value. The `++` operator increments the value of a variable by one and the `+=` operator assigns a new value to a variable, adding a number to the current value.

```
x = 10
x++
x ⟹ 11
x += 2
x ⟹ 13
```

## Functions

Functions are the way we can define new bits of, er, functionality, and give them names. They are in many respects like operators except that they are defined by us rather than built into the language. Also while operators tend to have names made of punctuation characters (`+`, `=`, etc.) functions are named following the same rules as variables.

There are two bits of syntax related to functions: how we define them and how we call them. A function definition starts with the word `function` and looks like this:

```
function double(n) {
  return n * 2;
}
```

The name after `function` is the name of the function being defined. It is followed by a set of `()`s enclosing a comma-separated list of variable names also known as the functions parameters. Then comes a pair of `{}` enclosing the code that makes up the function. Inside a function we can use the special word `return` followed by an expression to return the value of the expression from the function.


The syntax for calling a function is simpler: just the name of the function followed by `()`s enclosing a comma-separated list of expressions whose values will be assigned to the variables named by the function's parameters. The function call is itself an expression that produces a value, namely whatever value was `return`ed from the function.

```
double(10) ⟹ 20
```

## Control constructs

Normally code executes one line after another. Elements of the language that let us alter that order of execution are called "control constructs" as they control the flow of execution. The main kinds control constructs are the _conditional_ control constructs  that allow us to only execute code if a certain condition holds and _looping_ constructs that allow us to execute the same code repeatedly though possibly with different values of some variables. (The `return` in a function is also a kind of control constuct, returning control, and also a value, from the function containing the return to wherever the function was called.)

```
if (x == 0) {
  // something
}
```

```
for (let i = 0; i < s.length; i++) {
  // something
}
```

```
while (x < limit) {
  // something
}
```





## Some annoying details

Javascript, unfortunately obscures this a bit. If you try to multiply two strings, because `*` doesn't have a meaning for strings it will first try to convert them to numbers. Which might work if the text of the string looks like a number. Thus `"42" * 10 ⟹ 420`. But `"42" + 10` evaluates to the string `"4210"` not the number `52` because when applying the `+` operator to mixed types, Javascript tries to convert them all to strings first.

Anonymous functions.