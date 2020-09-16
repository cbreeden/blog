# How to shuffle a deck

There is a question that had been on my mind a few years ago. Maybe it wasn't even a question, but a curisoity. Someone once told me that it takes 7 shuffles for a perfect shuffle. And this statement left me with far more questions than it did answers. First, how do you know that it's seven shuffles, and what does a perfect shuffle even mean? And more importantly, how do you come to these conclusions. It's hard for me to take for granted lore like this. First, I want to understand if 7 shuffles are enough to randomly mix a deck of cards, and second I want to know you determine such a fact.

First let's talk about a "perfect" shuffle. We will construct a model to represent shuffling a deck of cards. A deck contains of 52 cards. Let's image that we have documented their order and placed a small tracking number on the top corner of each card. The deck of cards would be ordered as: 

    Deck: [ 1, 2, 3, 4, ..., 51, 52 ]
    
To start shuffling the deck of cards, we would first partition the into two equal stacks. This would yield us with two decks: 


    Top:    [ 1, 2, 3, ..., 25, 26 ], 
    Bottom: [ 27, 28, ..., 51, 52 ]
    
 
 And now we are left with two choices: should we start the shuffle where the bottom card of the top deck is set first, or should we start with the bottom card of the bottom deck? With these options you would get the following results:

     Top then Bottom: [ 27, 1, 28, 2, ..., 51, 25, 52, 26 ]
     Bottom then Top: [ 1, 27, 2, 28, ..., 25, 51, 26, 52 ]
 
Of these two options, one thing might stick out to you -- the first and the last card in the bottom then top shuffle stayed in their same slot. It just wouldn't feel right to shuffle a deck while leaving the first and the last card positions fixed so let's set that option to the side for now and just focus on the top then bottom option first. What is the next step? I walked through what happens when you perform a single shuffle of a deck of cards, how does that get us closer to understanding what seven shuffles would look like? How do you understand sequence of numbers like this?

The first question that comes to my mind when a see an operation like this is "if I keep shuffling my deck of cards like this, then eventually I must get back to the original deck, or at least eventually the pattern would have to repeat." So how would you figure out how many shuffles it takes to come back to the original deck? There is a field of mathematics called Abstract Algebra that can help you answer questions like these. You will learn a trick: following the path a single card will take as you shuffle through the deck. Eventually that card must make it back to its original position. How long would it take a card to arrive back to it's first position?

Let's start by following the path the first card takes:

    0 Shuffles: [  1, 2,  3, 4, ..., 49, 50, 51, 52 ]
    1 Shuffle:  [ 27, 1, 28, 2, ..., 51, 25, 52, 26 ]

After one shuffle, the first card went to the second position. If we would shuffle the deck again, you can then imagine that the first card is now where the 2 is, and then findout where the 2 would be placed after a shuffle (it's in the 4th position). This means that the 1 card would be in the 4th position after two shuffles. So far, the first card is taking the following path:

    1 -> 2 -> 4

To findout where the 1 card would be after three shuffles, we follow the same pattern by looking at where the 4 card would be placed after a shuffle (it would be placed in the 8 position). You might see a pattern by now, for the first half of the deck (1 - 26), after one shuffle their new position is 2n, where n is their original position. By this logic, the 1 card makes the following path

    1 -> 2 -> 4 -> 8 -> 16 -> 32 -> ???

Now the question is what happens to the 32th card when the deck is shuffled. The 16 card is in the bottom half of the deck, so it won't follow the same pattern as the top half where we just multipled their original position by 2. In the bottom half of the deck follows the same pattern as the top half except that we first subtrack by 26 (which is essentialy saying that the 27 card becomes the 1 card since it's on the top) and then multiply by 2 like with the top half, but then subtract one because bottom half of the deck is to the left of the top half after shuffling. This yields the pattern `2*(n - 26) - 1`. This formula isn't as easy to follow as `2n` for the top half, but it's a number that we can calculate. 

$$
    1 + 2 = 3    
$$

    Top then bottom shuffling:
    1. For 1 <= n <= 26, the resulting position is 2*n
    2. For 27 <= n <= 52, the resulting position is 2*(n-26)-1.


This means that the 32 card would go to position `2*(32 - 26) - 1 = 11`. So the next position would be in the 11 slot and since 11 is in the first half of the deck, the next position would be in the 22 slot. Continuing this process, we get the following path for the first card:

    1 -> 2 -> 4 -> 8 -> 16 -> 32 -> 11 -> 22 -> 44 -> 35 -> 17 -> 34 -> 15 -> 30 -> 7 -> 14 -> 28 -> 3 -> 6 -> 12 -> 24 -> 48 -> 43 -> 33 -> 13 -> 26 -> 52 -> 51 -> 49 -> 45 -> 37 -> 21 -> 42 -> 31 -> 9 -> 18 -> 36 -> 19 -> 38 -> 23 -> 46 -> 39 -> 25 -> 50 -> 47 -> 41 -> 29 -> 5 -> 10 -> 20 -> 40 -> 27

Note: After calculating the about 20 positions, I decided to write a program to calculate the rest for me.

By following the first card, we calculated that it takes 52 shuffles before it eventual makes it back to the first position. You might also noticed that no numbers in the sequency above is repeated -- and no number could repeat, for if you had two numbers in that list that repeated then you would form an cycle (elaborate). From this we can conclude that it takes 52 "perfect" shuffles before deck is shuffled back to its original position.