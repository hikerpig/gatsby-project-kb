# Week 0

## What is computer science?

- Computer science is fundamentally problem solving.
- We can think of **problem solving** as the process of taking some input (details about our problem) and generate some output (the solution to our problem). The “black box” in the middle is computer science, or the code we’ll learn to write.  
  ![word "input", arrow into box, arrow out of box, word "output"](https://cs50.harvard.edu/x/2021/notes/0//input_output.png)
- To begin doing that, we’ll need a way to represent inputs and outputs, so we can store and work with information in a standardized way.

## Representing numbers

- We might start with the task of taking attendance by counting the number of people in a room. With our hand, we might raise one finger at a time to represent each person, but we won’t be able to count very high. This system is called [[unary]], where each digit represents a single value of one.
- We’ve probably learned a more efficient system to represent numbers, where we have ten digits, 0 through 9:

  0 1 2 3 4 5 6 7 8 9

  - This system is called decimal, or [[base-10]], since there are ten different values that a digit can represent.

- Computers use a simpler system called [[binary]], or base two, with only two possible digits, 0 and 1.
  - Each _binary digit_ is also called a [[bit]].
- Since computers run on electricity, which can be turned on or off, we can conveniently represent a bit by turning some switch on or off to represent a 0 or 1.
  - With one light bulb, for example, we can turn it on to count to 1.
- Inside modern computers, there are not light bulbs but million of tiny switches called [[transistors]] that can be turned on and off to represent different values.

## Text

- To represent letters, all we need to do is decide how numbers map to letters. Some humans, many years ago, collectively decided on a standard mapping of numbers to letters. The letter “A”, for example, is the number 65, and “B” is 66, and so on. By using context, like whether we’re looking at a spreadsheet or an email, different programs can interpret and display the same bits as numbers or text.
- The standard mapping, [**ASCII**](https://en.wikipedia.org/wiki/ASCII), also includes lowercase letters and punctuation.
- If we received a text message with a pattern of bits that had the decimal values `72`, `73`, and `33`, those bits would map to the letters `HI!`. Each letter is typically represented with a pattern of eight bits, or a **byte**, so the sequences of bits we would receive are `01001000`, `01001001`, and `00100001`.
  - We might already be familiar with using bytes as a unit of measurement for data, as in megabytes or gigabytes, for millions or billions of bytes.
- With eight bits, or one byte, we can have 28, or 256 different values (including zero). (The _highest value_ we can count up to would be 255.)
- Other characters, such as letters with accent marks and symbols in other languages, are part of a standard called [**Unicode**](https://en.wikipedia.org/wiki/Unicode), which uses more bits than ASCII to accommodate all these characters.
  - When we receive an emoji, our computer is actually just receiving a number in binary that it then maps to the image of the emoji based on the Unicode standard.
    - For example, the “face with tears of joy” emoji is just the bits `000000011111011000000010`:  
      ![face with tears of joy emoji](https://cs50.harvard.edu/x/2021/notes/0//face_with_tears_of_joy.png)

## Images, video, sounds

- An image, like the picture of the emoji, are made up of colors.
- With only bits, we can map numbers to colors as well. There are many different systems to represent colors, but a common one is **RGB**, which represents different colors by indicating the amount of red, green, and blue within each color.
- For example, our pattern of bits earlier, `72`, `73`, and `33` might indicate the amount of red, green, and blue in a color. (And our programs would know those bits map to a color if we opened an image file, as opposed to receiving them in a text message.)
  - Each number might be a byte, with 256 possible values, so with three bytes, we can represent millions of colors. Our three bytes from above would represent a dark shade of yellow:  
    ![dark yellow](https://cs50.harvard.edu/x/2021/notes/0//72_73_33.png)
- The dots, or squares, on our screens are called **pixels**, and images are made up of many thousands or millions of those pixels as well. So by using three bytes to represent the color for each pixel, we can create images. We can see pixels in an emoji if we zoom in, for example:  
  ![zoomed-in emoji of laughing tears of joy with squares of pixels distinguishable](https://cs50.harvard.edu/x/2021/notes/0//emoji_zoomed.png)
- The **resolution** of an image is the number of pixels there are, horizontally and vertically, so a high-resolution image will have more pixels and require more bytes to be stored.
- Videos are made up of many images, changing multiple times a second to give us the appearance of motion, as an old-fashioned [flipbook](https://youtu.be/p3q9MM__h-M) might do.
- Music can be represented with bits, too, with mappings of numbers to notes and durations, or more complex mappings of bits to sound frequencies at each moment of time.
- File formats, like JPEG and PNG, or Word or Excel documents, are also based on some standard that some humans have agreed on, for representing information with bits.

## Algorithms

- Now that we can represent inputs and outputs, we can work on problem solving. The black box earlier will contain **algorithms**, step-by-step instructions for solving problems:  
  ![box with word "algorithms"](https://cs50.harvard.edu/x/2021/notes/0//algorithms.png)
- Humans can follow algorithms too, such as recipes for cooking. When programming a computer, we need to be more precise with our algorithms so our instructions aren’t ambiguous or misinterpreted.
- We might have an application on our phones that store our contacts, with their names and phone numbers sorted alphabetically. The old-school equivalent might be a phone book, a printed copy of names and phone numbers.
- Our input to the problem of finding someone’s number would be the phone book and a name to look for. We might open the book and start from the first page, looking for a name one page at a time. This algorithm would be **correct**, since we will eventually find the name if it’s in the book.
- We might flip through the book two pages at a time, but this algorithm will not be correct since we might skip the page with our name on it. We can fix this **bug**, or mistake, by going back one page if we flipped too far, since we know the phone book is sorted alphabetically.
- Another algorithm would be opening the phone book to the middle, decide whether our name will be in the left half or right half of the book (because the book is alphabetized), and reduce the size of our problem by half. We can repeat this until we find our name, dividing the problem in half each time. With 1024 pages to start, we would only need 10 steps of dividing in half before we have just one page remaining to check. We can see this visualized in an [animation of dividing a phone book in half repeatedly](https://youtu.be/F5LZhsekEBc), compared to the [animation of searching one page at a time](https://youtu.be/-yTRajiUi5s).
- In fact, we can represent the efficiency of each of those algorithms with a chart:  
  ![chart with: "size of problem" as x-axis; "time to solve" as y-axis; red, steep straight line from origin to top of graph labeled "n"; yellow, less steep straight line from origin to top of graph labeled "n/2"; green, curved line that gets less and less steep from origin to right of graph labeled "log_2  n"](https://cs50.harvard.edu/x/2021/notes/0//running_time.png)
  - Our first solution, searching one page at a time, can be represented by the red line: our time to solve increases linearly as the size of the problem increases. _n_ is a some number representing the size of the problem, so with _n_ pages in our phone books, we have to take up to _n_ steps to find a name.
  - The second solution, searching two pages at a time, can be represented by the yellow line: our slope is less steep, but still linear. Now, we only need (roughly) _n_ / 2 steps, since we flip two pages at a time.
  - Our final solution, dividing the phone book in half each time, can be represented by the green line, with a fundamentally different relationship between the size of the problem and the time to solve it: [**logarithmic**](https://en.wikipedia.org/wiki/Logarithm), since our time to solve rises more and more slowly as the size of the problem increases. In other words, if the phone book went from 1000 to 2000 pages, we would only need one more step to find our name. If the size doubled again from 2000 to 4000 pages, we would still only need one more step. The green line is labeled log2 _n_, or log base 2 of _n_, since we’re dividing the problem by two with each step.
- When we write programs using algorithms, we generally care not just how correct they are, but how **well-designed** they are, considering factors such as efficiency.

## Pseudocode

- We can write **pseudocode**, which is a representation of our algorithm in precise English (or some other human language):

  1 Pick up phone book  
  2 Open to middle of phone book  
  3 Look at page  
  4 If person is on page  
  5 Call person  
  6 Else if person is earlier in book  
  7 Open to middle of left half of book  
  8 Go back to line 3  
  9 Else if person is later in book  
  10 Open to middle of right half of book  
  11 Go back to line 3  
  12 Else  
  13 Quit

  - With these steps, we check the middle page, decide what to do, and repeat. If the person isn’t on the page, and there’s no more pages in the book left, then we stop. And that final case is particularly important to remember. When other programs on our computers forgot that final case, they might appear to freeze or stop responding, since they’ve encountered a case that wasn’t accounted for, or continue to repeat the same work over and over behind the scenes without making any progress.

- Some of these lines start with verbs, or actions. We’ll start calling these _functions_:

  1 **Pick up** phone book  
  2 **Open to** middle of phone book  
  3 **Look at** page  
  4 If person is on page  
  5 **Call** person  
  6 Else if person is earlier in book  
  7 **Open to** middle of left half of book  
  8 Go back to line 3  
  9 Else if person is later in book  
  10 **Open to** middle of right half of book  
  11 Go back to line 3  
  12 Else  
  13 **Quit**

- We also have branches that lead to different paths, like forks in the road, which we’ll call _conditions_:

  1 Pick up phone book  
  2 Open to middle of phone book  
  3 Look at page  
  4 **If** person is on page  
  5 Call person  
  6 **Else if** person is earlier in book  
  7 Open to middle of left half of book  
  8 Go back to line 3  
  9 **Else if** person is later in book  
  10 Open to middle of right half of book  
  11 Go back to line 3  
  12 **Else**  
  13 Quit

- And the questions that decide where we go are called _Boolean expressions_, which eventually result in a value of yes or no, or true or false:

  1 Pick up phone book  
  2 Open to middle of phone book  
  3 Look at page  
  4 If **person is on page**  
  5 Call person  
  6 Else if **person is earlier in book**  
  7 Open to middle of left half of book  
  8 Go back to line 3  
  9 Else if **person is later in book**  
  10 Open to middle of right half of book  
  11 Go back to line 3  
  12 Else  
  13 Quit

- Lastly, we have words that create cycles, where we can repeat parts of our program, called _loops_:

  1 Pick up phone book  
  2 Open to middle of phone book  
  3 Look at page  
  4 If person is on page  
  5 Call person  
  6 Else if person is earlier in book  
  7 Open to middle of left half of book  
  8 **Go back to line 3**  
  9 Else if person is later in book  
  10 Open to middle of right half of book  
  11 **Go back to line 3**  
  12 Else  
  13 Quit
