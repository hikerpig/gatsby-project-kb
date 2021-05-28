a) What is the expected output if the user provides the PIN “123” ?

## Compiling validate_pin.c using

```bash
$ gcc -fno-stack-protector validate_pin.c -ggdb -o validate_pin_no_stack_protection
```

Gives us an executable named validate_pin_no_stack_protection, on executing this file inside the terminal with
`./validate_pin_no_stack_protection` followed by the pin `123` returns:

```bash
$ ./validate_pin_no_stack_protection 123
Correct Pin
You can now withdraw money!
```

b) What is the expected output if the user does not provide any input?

## When the user doesn't provide any "PIN" following ./validate_pin_no_stack_protection, our program returns "Please enter your PIN"

```bash
$ ./validate_pin_no_stack_protection
Please enter your PIN
```

c) Run the program and start by entering “000” (three 0s) and then keep increasing the number of 0s one by one. What happens and why? (2 Mark)

## Program returns `Wrong Pin` for one 0 till eleven 0s, on executing the program with twelve 0s, the program returns a loop of `Wrong Pin`

## Upon entering more than twelve 0s, we get a segmentation fault (core dumped)

```bash
$ ./validate_pin_no_stack_protection 000000000000000
Wrong Pin
Segmentation fault (core dumped)
```

Core Dump/Segmentation fault is a specific kind of error caused by accessing memory that “does not belong to you.”

d) Run the program and start by entering “YYY” (three Ys) and then keep increasing the number of Ys one by one. What happens and why? (2 Marks)

## Program returns `Wrong Pin` for one 'y' till eleven 'y's, on executing the program with twelve 'y's, the program returns a loop of `Wrong Pin`

## Upon entering more than twelve 'y's, we get a segmentation fault (core dumped)

```bash
$ ./validate_pin_no_stack_protection yyyyyyyyyyyyy
Wrong Pin
Segmentation fault (core dumped)
```

e) Recompile the program with stack protection enabled:
gcc -fstack-protector validate_pin.c -ggdb -o
validate_pin_withProtection
Re-run step d) What happens and why?
Hint: check the stack layout of the protected and non-protected
programs. (3 Marks)

## Recompilng validate_pin.c using the given command gives us an executable named `validate_pin_withProtection`

## Upon executing `validate_pin_withProtection` followed with one 0 returns "Wrong Pin",

f) Change the line char pin[3]; to char pin[4]; and recompile the code using:

gcc validate_pin.c -ggdb -o validate_pin4_withProtection
and rerun Step e). What happens now and why? (3 Marks)
Hint: https://wiki.ubuntu.com/ToolChain/CompilerFlags
