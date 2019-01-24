# Apple Picker

This is a simple clicker game that my class created one day by following our
teacher's instructions. Rather than doing percisely what our teacher was doing,
I instead added more complex functions and features to my app. Rather than using
a moving icon as the object to click, [I created a function to generate a label
with a red circle](code.js#L66-L80) (to represent an apple) to be clicked on. 
This allowed my clicker game to have multiple objects to be clicked at once. 
In addition, while lives were lost in the example by clicking elsewhere on the 
screen, lives were lost in my app [when a timer generating a random number 
decided for the apple to become "eaten"](code.js#L82-L92) (when the color changes 
to grey and the birds take a bite out of it).

You can find the original project [here](https://studio.code.org/projects/applab/aDnWQYFh7r5wfbkBLDmmjhFmRcZTrtl-rxK14Ugad4U).
