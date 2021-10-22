# Boolean simplification

We're all familiar with the idea of truth and falsity and most of us
are perfectly capable of reasoning about simple logical expressions:
if I tell you that I only eat when I have food and am hungry and then
I tell you I have a bunch of bananas but am not hungry, you can
probably predict that I will not eat because you understand that the
*and* in “have food and am hungry” means both facts have to be true
for me to eat. On the other hand, if I told you that I eat whenever
I'm hungry or bored you can probably predict that even if I'm not
hungry but I'm bored, I'm probably eating.

In computers we call this kind of logic “Boolean logic”, after George
Boole who discussed it in a couple of books he wrote in the mid-1800s.
In Javascript—and many other languages—we call the two values `true`
and `false` Booleans and expressions that evaluate to those values,
Boolean expressions.

Several of the problems in the JS 1-10 problem set involve Boolean
expressions. The very first, as you may recall, asks for a function,
`sleep_in`, that given two Boolean values, one saying whether it’s a
weekday and the other saying whether we're on vacation, returns `true`
if we can sleep in which we can do, according to the problem
statement: “if it is not a weekday or we're on vacation” and otherwise
`false`.

But despite our intuitive familiarity with practical logic when it
comes time to render these statements in code, many new programmers
get lost in a maze of `if` statements and expressions that seem way
more complex than ought to be needed to answer a simple question like
whether we can sleep in.

Luckily there are a few simple techniques for simplifying Boolean
expressions that will let us tame this complexity.

To illustrate them, let’s take a look at one way to implement the
`sleep_in` function. Since there are only two arguments (`weekday` and
`vacation`) and they can each only take one of two values (`true` and
`false`) there are exactly four possible cases. So if we didn’t have
any other clever ideas, we could just write a series of `if`
statements to cover all four possible combinations of the two
arguments: (`true`, `true`), (`true`, `false`), (`false`, `true`), and
(`false`, `false`), giving us something like this skeleton:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true) {
    // TODO: implement
  }
  if (weekday == true && vacation == false) {
    // TODO: implement
  }
  if (weekday == false && vacation == true) {
    // TODO: implement
  }
  if (weekday == false && vacation == false) {
    // TODO: implement
  }
}
```

The only thing that is left is to replace the `TODO` comments with
something that returns the right value for each case, like this:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true) {
    return true; // We can sleep in because we’re on vacation
  }
  if (weekday == true && vacation == false) {
    return false; // Can’t sleep in because it’s a regular week day.
  }
  if (weekday == false && vacation == true) {
    return true; // We can sleeep in because we’re on vacation. Also it’s the weekend
  }
  if (weekday == false && vacation == false) {
    return true; // We can sleep in because it’s the weekend.
  }
}
```

This is not exactly how I’d would recommend writing this function but
it is indeed how many new programmers would write it. And it is a
correct definition of the requested function which is great news,
because now we can simplify things in careful steps and after each
step rerun the tests to make sure we haven’t broken it. In these notes
I’m going to discuss how I’d go about simplifying code like this.

The very first simplification is one of my favorites.

## Replace all comparisons to literal `true` and `false` with just the thing or `!` the thing.

There are lots of expressions that evaluate to a Boolean value
including variables like `vacation` and `weekday` as well as more
complex expressions involving `&&`, `||`, and `!`. But there are only
two literal Booleans: `true` and `false`. While occasionally you will
need to use literal `true` and `false` in your code, you should never
compare to either of them. Look at what comparing to the literal
`true` does:

```
true == true ⟹ true
false == true ⟹ false
```

Notice that the value of the expression as a whole is always the same
as the value we are comparing to `true`. So anywhere we have an
expression of the form `x == true` we can replace it with just `x`.

So let’s do that everywhere we compare to literal `true` in this
function:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (weekday && vacation == false) {
    return false;
  }
  if (weekday == false && vacation) {
    return true;
  }
  if (weekday == false && vacation == false) {
    return true;
  }
}
```

Similarly, the value of comparing to literal `false` is solely
determined by the value being compared but in this case it is
logically flipped: `true` goes to `false` and `false` goes to `true`.

```
true == false ⟹ false
false == false ⟹ true
```

But we have an operator that does that: `!` which can be read as “not”:

```
!true ⟹ false // i.e. not true is false
!false ⟹ true // i.e. not false is true
```

So anywhere we have an expression of the form `x == false` we can
replace it with `!x`. If we do this we get this:


```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (weekday && !vacation) {
    return false;
  }
  if (!weekday && vacation) {
    return true;
  }
  if (!weekday && !vacation) {
    return true;
  }
}
```

Notice how this is starting to be almost readable as English: `if
(weekday && vacation) …` can be read as “if it’s a weekday and a
vacation” and `if (weekday && !vacation) …` can be “if it’s a weekday
and not a vacation” without having to mentally translate a bunch of
`== true` and `== false` cruft.

The next simplification isn’t strictly about Booleans expressions but
has to do with how we use `if` statements which is closely related.

## Chain mutually exclusive `if` statements with `else` clauses.

By itself an `if` statement just controls whether the code inside its
`{}`s executes. Sometimes of course we want to do something else when
the tested condition is not true. We could write that with another
`if` clause with a test condition that is true when the the first
`if`’s test condition is false and vice versa:

```javascript
if (timeForBed) {
  brushTeeth();
}

if (!timeForBed) {
  eatSnacks();
}
```

However this is unnecessarily complicated. To understand the code we
have to mentally parse two separate test conditions and notice that
only one of them can be true at a time and therefore that it’s
impossible that we will end up eating snacks after we’ve brushed our
teeth. In this case because one test condition is `!` the other that’s
not too hard to see but it would be even more clear if we used an
`else` clause:

```javascript
if (timeForBed) {
  brushTeeth();
} else {
  eatSnacks();
}
```

Sometimes there might be more than just two cases. For instance, we
probably shouldn’t *always* eat just because it’s not bedtime. So
let’s add another Boolean `hungry`. If it’s bedtime, it doesn’t matter
if we’re hungry—we have to brush our teeth. But if it’s not bedtime
then we eat snacks or read depending on whether we’re hungry.

```javascript
if (timeForBed) {
  brushTeeth();
} else {
  if (hungry) {
    eatSnacks();
  } else {
    read();
  }
}
```

Since nested code like this can be hard to read in its own way, it’s
traditional to write the chain like this instead:

```javascript
if (timeForBed) {
  brushTeeth();
} else if (hungry) {
  eatSnacks();
} else {
  read();
}
```

The meaning is the same but it makes it a bit more clear that there
are three branches: the time for bed branch, the not time for bed and
hungry branch, and the neither time for bed nor hungry branch. To
express the same thing as a series of independent `if` clauses we
would need to `&&` in the the negation of all the previous test
conditions like this:

```javascript
if (timeForBed) {
  brushTeeth();
}
if (!timeForBed && hungry) {
  eatSnacks();
}
if (!timeForBed && !hungry) {
  read();
}
```

To see a real example of how converting from a sequence of `if`s to
chained `if/else`s can simplify code, consider this set of `if`
statements, similar to what many of you wrote for the `caughtSpeeding`
problem.

```javascript
if (speed < 61) {
  return 0;
}
if (speed > 60 && speed < 81) {
  return 1;
}
if (speed > 80) {
  return 2;
}
```

The idea is to return 0 if the speed is less than 61 mph, 1 if it’s
between 61 and 80, and 2 if it’s over 80. The code is correct but a
little tricky to read with four different comparisons and a logical
`&&` that all need to line up together to work right. In this case we
don’t actually have to make sure that the test conditions are mutually
exclusive because the first `if` whose test condition is true will
`return`, but we do need to make sure that the test conditions are
comprehensive, meaning that every value of `speed` will satisfy one of
them. We can make the latter much easier to see, and halve the number
of comparisons we need to do, if we chain the `if` statements and
remove the parts of the test conditions that are handled by earlier
cases:

```javascript
if (speed < 61) {
  return 0;
} else if (speed < 81) {
  return 1;
} else {
  return 2;
}
```

Back at our evolving version of `sleep_in`, however, the test
conditions are a bit more complicated so it’s not obvious how we can
simplify them after they are chained together. But it’s still worth
converting to the chained `if/else` style if only to make it clear
that the branches are supposed to be mutually exclusive:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  } else if (!weekday && vacation) {
    return true;
  } else if (!weekday && !vacation) {
    return true;
  }
}
```

Assuming the code was right before, this doesn’t change its behavior
at all. And because each `if` statement contained a `return` clause,
we know for certain that as soon as one of the test conditions was
true it would return from the function and the other `if` statements
would not get a chance to execute. So this is certainly logically
equivalent.

You might also notice that we don’t have a plain `else` clause here.
That’s fine—if none of the test conditions are true then we will fall
out after the last clause and then rather than returning a value
explicitly from `sleep_in` it will implicitly return `undefined`.
Which should raise the question, do these four branches cover all the
possible cases so this function is in fact defined for all possible
inputs? If they do (and we constructed this function in the first
place so they would), then logically we could take the test condition
off the last `else if` like this:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  } else if (!weekday && vacation) {
    return true;
  } else {
    return true;
  }
}
```

However, let’s leave it with the test condition for now and see if
after some other simplifications we can’t prove to ourselves that we
have captured all the possibilities.

The next simplification is one that is applicable to far more than
simplifying uses of Booleans but it’s useful here.

## Remove duplicate code

It is almost always a good idea to try to remove duplicated code.
Duplicated code, i.e. the same code occuring more than one place in
your program, makes a program harder to read and harder to change.
Harder to read because you have to read very carefully to make sure
that what looks like duplicate code is actually the same as other
copies. And harder to change because if you need to change it, you
need to make sure you change all the copies.

In this function it may not be obvious what code is duplicated, as
it’s a pretty small amount. But there *are* three copies of `return
true`, one in each of the first three branches of our `if/else`. While
this is a pretty mild case of code duplication, it’s still worth
seeing how we can get rid of it as it will move us into a position
where we can further simplify things.

First off, since the branches of our `if/else` construct are mutually
exclusive their ordering doesn’t matter so let’s reorder them to put
all the branches in which we return `true` together:

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (!weekday && vacation) {
    return true;
  } else if (!weekday && !vacation) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  }
}
```

Now we can now read the first three branches together as, “return
`true` if the first test condition is true or the second test
condition is true or the third test condition is true.” Well, we have
a Boolean operator that can combine Boolean values with a logical
“or”: `||` so we can rewrite with one test condition that `||`’s
together the three conditions under which we return `true`:

```javascript
function sleep_in(weekday, vacation) {
  if ((weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  }
}
```

It’s not clear that that’s a huge improvement in readability but now
we’ve got something to work with and can move on to the meat of
simplifying Boolean expressions.

## Simplifing complicated Boolean expressions

Consider the gnarly expression we just wrote as our first test
condition:

```javascript
(weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)
```

It seems weird that it takes three `&&`, two `||`, and a couple of `!`
operators to reduce the two values, `weekday` and `vacation` down to a
single Boolean value. Surely there must be a simpler way to write that
expression.

And indeed there is. The process of simplifying Boolean expressions is
just like simplifying arithmetic expressions except with slightly
different rules. With numbers we’re used to rules like:

```
1 × x ⟹ x
0 + x ⟹ x
x / x ⟹ 1 (assuming x ≠ 0)
```

Because you already know those rules from math class you presumably
understand the following simplification:

```
(32 - 32) + x × (50 / 50)
0 + x × 1
0 + x
x
```

In Boolean logic the rules are actually quite similar:

```
true && x ⟹ x
false || x ⟹ x
```

If you squint you can think of the Boolean values `true` and `false`
as analogous 1 and 0 and the operators `&&` and `||` as anologs to
multiplication and addition in which case `true && x ⟹ x` is similar
to `1 × x ⟹ x` and `false || x ⟹ x` is like `0 + x ⟹ x`.

Two other rules came from basic logic—given any x:

```
x && !x ⟹ false // i.e. you can’t be both hungry and not hungry.
x || !x ⟹ true  // i.e. you are always either hungry or not hungry.
```

And just like in math where we can factor out the `b` in:

```
(a * b) + (c * b)
```

to get:

```
b * (a + c)
```

with Booleans the common elements of `&&` expressions `||`’d together
can be factored out, so:

```
(a && b) || (c && d)
```

is equivalent to:

```
b && (a + c)
```

With those rules in mind let’s tackle the big Boolean expression from
the first branch of our `if` statement:

```
(weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)
```

Group the first two expressions to deal with them first:

```
((weekday && vacation) || (!weekday && vacation)) || (!weekday && !vacation)
```

Then factor out the `vacation` from the two terms of that grouped expression:

```
(vacation && (weekday || !weekday)) || (!weekday && !vacation)
```

Simplify `(weekday || !weekday)` via the `x || !x ⟹ true` rule:

```
(vacation && true) || (!weekday && !vacation)
```

And then simplify `(vacation && true)` via the `x && true ⟹ x` rule:

```
vacation || (!weekday && !vacation)
```

Almost there. Now consider how this expression will be evaluated. If
`vacation` is true the value of the whole expression is true and we
don’t even have to think about the part after the `||`. Therefore the
only time the second term is relevant is when `vacation` is false. So
replace `vacation` with `false` in the second term:

```
vacation || (!weekday && !false)
```

Now there are just a couple steps to go:

```
vacation || (!weekday && true)
```

And:

```
vacation || !weekday
```

Dropping that much simpler expression back into our `if` clause we end
up with this:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !vacation) {
    return false;
  }
}
```

I mentioned earlier on that we’d want to make sure that our four
branches were in fact exhaustive, covering all the possible
combinations of arguments we could get. We’re pretty sure they are
because that’s how we constructed the very first version of the
function. However we can also use a similar kind of logic as we just
used in the last few steps of simplifying the `if ` test condition to
further simplify the test in the `else if` branch: We know that we
only end up in the `else if` branch if the test condition in the `if`
branch was false. And we know that in order for `vacation || !weekday`
to be false both sides of the `||` need to be false which means
`vacation` would have to be false and `!weekday` would have to be
false which means `weekday` would have to be true. Therefore in the
`else if` test condition we can replace `weekday` and `vacation` with
the values we know they must have if we got there:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true && !false) {
    return false;
  }
}
```

Hopefully you can see how `true && !false` can be further simplified
all the way down to `true` giving us:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true) {
    return false;
  }
}
```

which is equivalent to:

```javascript
function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else {
    return false;
  }
}
```

And now we’re ready for the final Boolean related simplification.

## If you need to return a Boolean and you have one, just return it.

Look carefully at the version of the function just above. When does it
return `true`? When the test condition, `vacation || !weekday` is
true. And when does it return `false`? When the test condition is
false. Just the same way you don’t need to compare a Boolean value
with `== true` to determine whether it is true—it’s already either
true or false—you don’t need to use an `if` on a Boolean value to
decide whether to return `true` or `false`. If you have an expression
to put in the `if` test, and you’re going to return `true` if it’s
true and `false` if it’s false, just return it:

```javascript
function sleep_in(weekday, vacation) {
  return vacation || !weekday;
}
```

## Okay cool, but this seems really tedious.

We’ve come a long way from our original

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true) {
    return true;
  }
  if (weekday == true && vacation == false) {
    return false;
  }
  if (weekday == false && vacation == true) {
    return true;
  }
  if (weekday == false && vacation == false) {
    return true;
  }
}
```

to:

```javascript
function sleep_in(weekday, vacation) {
  return vacation || !weekday;
}
```

Note also that the final version is actually a pretty direct
translation of the original problem statement that we should return
true, “if it is not a weekday or we're on vacation”. (We reversed the
order of the tests but you can read it as, “return whether we are on
vacation or it is not a weekday”.

Which may raise the question, do we have to go through all those
tedious simplification steps every time we write a simple function?

Luckily the answer is no. You will need to get some familiarity with
them because Boolean logic is pretty central to computer programming
but once you get used to expressing combinations of Boolean values you
will naturally simplify as you go. You will never write `x == true`
when you could just write `x`. And if you know you are writing a set
of mutually exclusive branches you will start with an `if/else`
construct rather than a set of independent `if` statements with more
complicated test conditions.

And once you get comfortable with the idea that Boolean values are
just another kind of value that you can compute with and return from
functions, when faced with a problem like `sleep_in` you might realize
you don’t even need an `if`; you just need to write the expression
that captures the desired logic, as we did in our final version of the
function.
