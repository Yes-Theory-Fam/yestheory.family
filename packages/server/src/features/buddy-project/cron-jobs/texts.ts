import { GuildBasedChannel, TextChannel } from "discord.js";

export const oddQuestions = `1. What were the highest and lowest points in your life so far respectively?
3. What is the one thing that you regret saying ”no” to?
5. What would you do differently if nobody would judge you?
7. What makes you engage in the Yes Theory and what do you want to achieve in the community?
9. What is the key to a meaningful relationship?
11. How do you best connect with others?
13. What would you call this year if you gave it a name and why?
15. Have you ever changed or considered changing yourself in order to be accepted by others?
17. If you could describe yourself with one word, what would it be and why?
19. What is the quote that you live by?
21. How do you motivate yourself when you want to give up?
23. What’s the last thing you want to do in your last 24 hours?
25. What do you think about yourself?
27. Where in the world do you feel like you belong and have a meaning?
29. Summarize your conversations in one sentence.`;

export const evenQuestions = `
2. What’s stopping you from being the person you want to be?
4. What life lesson did you learn the hard way?
6. Who is the person inspiring you the most and why?
8. If you could meet one stranger again that you’ve met in the past, who would it be and why?
10. What do you want people to say about you at your funeral?
12. What is your greatest and most memorable Seek Discomfort moment?
14. What does happiness mean to you?
16. What is the true meaning of life according to you?
18. What are some of the things you remember that you'd rather forget?
20. How has your family impacted you as a person?
22. What’s the most important quality to have in life and why?
24. What’s one thing you wish you knew 10 years ago?
26. What’s your passion?
28. What’s the best way to create value according to you?
30. Write down a list of 3 things you’ve learned from your buddy during this conversation and share the list with your buddy.`;

export const intro = (
  buddyId: string,
  channel: GuildBasedChannel | undefined
) =>
  `Your buddy is <@${buddyId}>! *Only shows up as numbers and symbols? Have a look at ${channel} to find help.*`;
