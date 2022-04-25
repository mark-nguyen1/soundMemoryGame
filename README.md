# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Mark Nguyen

Time spent: **22.3** hours spent in total

Link to project: https://glitch.com/edit/#!/vigorous-pickle-politician

## Required Functionality

The following **required** functionality is complete:

* [✔]  Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [✔]  "Start" button toggles between "Start" and "Stop" when clicked. 
* [✔]   Game buttons each light up and play a sound when clicked. 
* [✔]  Computer plays back sequence of clues including sound and visual cue for each button
* [✔]  Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [✔]  User wins the game after guessing a complete pattern
* [✔]  User loses the game after an incorrect guess

The following **optional** features are implemented:

* [✔] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [✔] Buttons use a pitch (frequency) other than the ones in the tutorial
* [✔] More than 4 functional game buttons
* [✔] Playback speeds up on each turn
* [✔] Computer picks a different pattern each time the game is played
* [✔] Player only loses after 3 mistakes (instead of on the first mistake)
* [✔] Game button appearance change goes beyond color (e.g. add an image)
* [✔] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [✔] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

-  List anything else that you can get done to improve the app!
- [✔] Game buttons are disabled during clue sequence; re-enabled during user's turn
- [✔] In game clock display 
- [✔] Rotating audio menu (piano, arcade, pokemon)
- [✔] Rotating button menu (5-8 buttons)
- [✔] Rotating display menu (light/dark)
- [✔] Rotating difficulty-level menu (easy,medium,hard)
- [✔] Menu buttons are disabled during gameplay, except when transitioning between light/dark mode
- [✔] Heart images presenting lives remaining 
- [✔] Keeps track and displays high score 
- [✔] Keeps track of rounds completed
- [✔] Alert system for out of time loses and mistakes before the 3rd occurrences
- [✔] Buttons background image are unique based on audio type


## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
<br><b>MAIN WALKTHROUGH</b> 
![pressingFINAL1](https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/walkThroughFTL_final1.gif?v=1650686307332)



Winning Game:
![losingFINAL1](https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/winningFTL1.gif?v=1650686902465)

Losing Game:
![winningFINAL1](https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/losingFTL1.gif?v=1650687172506)



## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

 HTML
<br> https://www.youtube.com/watch?v=pQN-pnXPaVg&t=1s
<br> https://www.w3schools.com/js/js_random.asp
<br> https://www.w3schools.com/jsref/met_win_setinterval.asp
<br> https://www.w3schools.com/jsref/met_win_settimeout.asp
<br>https://www.w3schools.com/jsref/met_win_clearinterval.asp
<br>CSS
<br>https://web.dev/learn/css/
<br>https://www.w3schools.com/css/css_boxmodel.asp
<br>https://www.w3schools.com/cssref/css_colors.asp
<br>JavaScript 
<br>https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction
<br>https://www.youtube.com/watch?v=PkZNo7MFNFg
 
<br>https://online-voice-recorder.com/ (audio)
<br>https://images.google.com/ (images) 
<br>https://www.freecodecamp.org/ (general) 
<br>https://www.w3schools.com/ (general)


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

A challenge I encountered creating this submission was fully understanding how the different HTML elements worked together with Javascript functions and as well as CSS properties. HTML, CSS, and Javascript were all something that was relatively new to be before working on this project. To combat this, I decided to read about the documentation to get familiar with the languages. A video that helped me tremendously was CodeCamp’s free 2 hours long video on HTML where I learned all about the basic tags and how they are used to make a webpage. Moreover, I was able to use my background knowledge of C++  and Java function and variable properties to quickly pick up Javascript.With these tools, I was able to implement the timer, but it was not easy.  At first, I successfully created a timer where it would count down from 30 seconds. However, the timer would start immediately when the clue sequence would start, not after. Moreover, the timer was just text, there was no CSS to style the stopwatch. I wanted the timer to start only when the clue sequence was finished and to add some styling to better represent the stopwatch.  To combat this, I used console.log() to help me trace the Javascript code more efficiently. This helped me keep track which functions were called and, more importantly, in which order. It was then when I realized that I could use the setTimeout() function to start the timer. By giving it a delay to match when the clue sequence would be finished, the timer would only then start to countdown. Next, I used  www.w3schools.com’s resource to learn about CSS syntax. The CSS box model helped me tremendously when creating the website as it taught me more about how a website could be layout. This was how I was able to get the general layout of my website and the circular shapes design  of the buttons as well. Through many hours of trial and error, I finally was able to get the stopwatch working, and as well added a difficulty feature (easy,medium,hard) that would change the amount of time given each round. After working on this project, I believe I have grown and learned alot about how HTML, JavaScript, and CSS all have a key role in order to create a website. 

 3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

After completing this pre-work project it has got me thinking how other websites similar to the one I made are constructed. This was a "simple" project but there was a lot that went into it. I wonder how other large websites are made. I wonder how long it would take to construct a website of such great size or how one would maintain it and make changes if they find a bug. What color schemes would be best? What are the best ways to keep the website updated? How would a website be designed to be compatible with desktops, mobile devices, and tablet users? How do engineers maintain readable code for others? All of this has gotten me excited!

 4.If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)

First off, I would like to work on the interface. I would like a more colorful and unique design of the background, adding more diversity to the color scheme of the project. Feature-wise I would like to add an “infinite” mode to the game; where the rounds are endless and users play to see how far they can go. To add on, a leaderboard system would suitable as it can keep track of people’s record of the highest round. 
## Interview Recording URL Link

[My 5-minute Interview Recording ] https://www.loom.com/share/6bf10169ca5f496e845738c258555dfb



## License

    Copyright Mark Nguyen

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
