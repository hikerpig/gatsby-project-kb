# Understanding Binary

Binary numbers are base 2 numbers, and have only two values – **0 and 1**.

If we look at a binary number like 101, then we can again assign column values as we did with our decimal number, but this time we use 2, and not 10 as the base.

So binary **101** binary has 1 in the units column,0 in the 2s column and 1 in the 4s column.

Again if we work our way from right to left then:

The 1 is a 1 as it is in the units column but the next 1 is not 1 but 1\*4=4

![binary-number-1](http://www.steves-internet-guide.com/wp-content/uploads/binary-number-1.jpg)

Binary numbers use base 2 and so the columns are

![binary numbers-powers](http://www.steves-internet-guide.com/wp-content/uploads/binary-numbers-powers.jpg)

- In binary, with just two digits, we have powers of two for each place value:

  22 21 20

  #

  - This is equivalent to:

    4 2 1

    #

- With all the light bulbs or switches off, we would still have a value of 0:

  4 2 1
  **0 0 0**

- Now if we change the binary value to, say, `0 1 1`, the decimal value would be 3, since we add the 2 and the 1:

  4 2 1
  **0 1 1**

- If we had several more light bulbs, we might have a binary value of `110010`, which would have the equivalent decimal value of `50`:

  32 16 8 4 2 1
  **1 1 0 0 1 0**

  - Notice that `32 + 16 + 2 = 50`.

- With more bits, we can count up to even higher numbers.
