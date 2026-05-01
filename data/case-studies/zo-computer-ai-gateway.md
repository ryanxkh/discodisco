# CASE STUDY — zo-computer-ai-gateway

Profile: ai-native
Source: https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel

Your Privacy

This site uses tracking technologies. You may opt in or opt out of the use of these technologies.

Essential
On

Essential cookies and services are used to enable core website features, such as ensuring the security of the website.

* * *

Marketing
Off

Marketing cookies and services are used to deliver personalized advertisements, promotions, and offers. These technologies enable targeted advertising and marketing campaigns by collecting information about users' interests, preferences, and online activities.

* * *

Analytics
Off

Analytics cookies and services are used for collecting statistical information about how visitors interact with a website. These technologies provide insights into website usage, visitor behavior, and site performance to understand and improve the site and enhance user experience.

* * *

Functional
Off

Functional cookies and services are used to offer enhanced and personalized functionalities. These technologies provide additional features and improved user experiences, such as remembering your language preferences, font sizes, region selections, and customized layouts. Opting out of these cookies may render certain services or functionality of the website unavailable.

SaveDenyAccept all

[Privacy Policy](https://vercel.com/legal/privacy-policy)

Your Privacy

This site uses tracking technologies. You may opt in or opt out of the use of these technologies.

DenyAccept all

Consent Settings

[Privacy Policy](https://vercel.com/legal/privacy-policy)

 [Skip to content](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# How Zo Computer improved AI reliability 20x on Vercel

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/5o5CZNGvlw1dk6eS58ASNm/05bf2dc16f4a64a8dcac6f10620edebb/eric-dodds-128.jpg)\\
Eric DoddsContent Engineering Lead](https://twitter.com/ericdodds)

4 min read

Copy URL

Copied to clipboard!

Apr 17, 2026

### [Link to heading](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel\#zo-computer-on-vercel) Zo Computer on Vercel

- 20x reduction in retry rate (7.5% → 0.34%)

- 99.93% chat success rate (up from 98%)

- P99 latency cut 38% (131s → 81s)

- New models added in less than 1 minute


Every company has servers that store data, run services, and do work around the clock. Consumers just have apps. Rob Cheung, co-founder of Zo Computer, is closing that gap. Zo is a personal AI cloud: your own servers and data that power an always-on agent.

"Cloud is one of the best computing models of all time, and consumers have zero direct access because it's so complicated," explained Rob Cheung, co-founder and CEO of Zo. "Now, with AI, it's finally possible for all of us to have cloud computers."

Zo is an AI-enabled, personal cloud computer, complete with a database and files.

Zo is a full computing environment, not just a chatbot. Rob laughs about his mom running servers and databases without knowing it. People use Zo to manage small businesses, do research, organize finances, and track health data.

The 8-person company is two and a half years old and they have an ambitious goal: to onboard one million new users to personal cloud computing in 2026. That means millions of AI model calls every day, and when Zo users text their agent like a friend, they expect the same responsiveness.

> “We’re building a new model of personal cloud computing that's always-on, elastic, and private by default for every user. Vercel gives us the AI infrastructure to make it possible.We’re building a new model of personal cloud computing that's always-on, elastic, and private by default for every user. Vercel gives us the AI infrastructure to make it possible.We’re building a new model of personal cloud computing that's always-on, elastic, and private by default for every user. Vercel gives us the AI infrastructure to make it possible.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/74FcxHXbdsuXaXlg1vQ4TV/9652957571ff2a20a426ee34585ce45a/rob-cheung-zo.jpeg)
>
> **Rob Cheung,** co-founder and CEO @ Zo Computer

### [Link to heading](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel\#death-by-a-thousand-adapters) Death by a thousand adapters

Zo gives users access to any model they want, and supports bring-your-own-key. That means their backend has to talk to every major provider: OpenAI, Anthropic, MiniMax, GLM, Fireworks, and more.

Before they moved to Vercel, that meant custom adapter code for each model. Every provider required different handling for images, different key management, and different edge cases. On top of the code complexity, Zo's team was managing retries, provider routing, and fallback logic themselves.

Every time a provider shipped a new model, an engineer had to write a new adapter, test the edge cases, and run the deployment pipeline. With new models released weekly, it was a constant drag on a small team building a consumer product, and their users felt it.

Zo's baseline for AI model calls was a 98% success rate with a 7.5% retry rate. That means 1 in 50 messages failed or retried, adding up to tens of thousands of model fallbacks every day.

> “We didn't even know what we were missing until after we switched to Vercel's AI Gateway. The revelation came through the numbers. We just had so many failures previously.We didn't even know what we were missing until after we switched to Vercel's AI Gateway. The revelation came through the numbers. We just had so many failures previously.We didn't even know what we were missing until after we switched to Vercel's AI Gateway. The revelation came through the numbers. We just had so many failures previously.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/74FcxHXbdsuXaXlg1vQ4TV/9652957571ff2a20a426ee34585ce45a/rob-cheung-zo.jpeg)
>
> **Rob Cheung,** co-founder and CEO @ Zo Computer

### [Link to heading](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel\#ai-sdk-+-ai-gateway:-two-layers,-one-integration) AI SDK + AI Gateway: two layers, one integration

Zo moved to Vercel's AI SDK and AI Gateway, which solved two distinct problems.

AI SDK replaced the custom adapter code. Instead of per-provider implementations with bespoke edge case handling, Zo's engineers got a unified interface for every model, from image support to response format normalization.

AI Gateway replaced the infrastructure-level complexity. Retries, fallback routing, provider health monitoring, and uptime were all handled at the routing layer in Vercel instead of in Zo's codebase.

Zo's embedded AI makes any kind of task with any kind of data as simple as asking a question. In this example, a user turns an audio recording into a journal entry.

Rob's co-founder built APIs at Stripe, where developer experience was the product. He describes the combined effect of AI SDK and AI Gateway the same way: everything just works, and the pieces you don't see matter most.

> “Moving to the gateway is just so ergonomic. We get references to model names, and then rely on you to do the correct implementations and handle the edge cases. Moving to the gateway is just so ergonomic. We get references to model names, and then rely on you to do the correct implementations and handle the edge cases. Moving to the gateway is just so ergonomic. We get references to model names, and then rely on you to do the correct implementations and handle the edge cases. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/1qJidxz5NizmREyfAiLqbq/7b9b355668e66d6901971afa407e8383/ben-guo-zo.png)
>
> **Ben Guo,** co-founder @ Zo Computer

New model support went from an hour-long, multi-file code change to adding a config string in 30 seconds. The day MiniMax shipped M2.7, Zo had it live for users immediately. No adapter code, no edge case testing, no deploy cycle.

For an 8-person team focusing on onboarding their first million users to personal cloud computing, cutting out interruptions for model support has been a huge relief.

### [Link to heading](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel\#20x-improvement-in-reliability) 20x improvement in reliability

During the rollout, Zo ran Vercel and non-Vercel routes simultaneously, creating a live A/B comparison under identical production conditions.

The results:

| **Period** | **Route** | **POST error** | **Chat success** | **Retry rate** | **Avg attempts** |
| --- | --- | --- | --- | --- | --- |
| Before switch | Non-Vercel | 4.59% | 99.73% | 7.52% | 1.12 |
| After switch | Non-Vercel | 10.38% | 97.86% | 17.07% | 1.29 |
| After switch | Vercel | 0.45% | 99.93% | 0.34% | 1.00 |

The non-Vercel route actually degraded during the same period that Vercel held steady. Retry rate dropped from 7.5% to 0.34%, a 20x improvement. Average attempts per chat hit 1.00, meaning virtually every request succeeded on the first try.

On MiniMax M2.5, Zo's most-used model, the latency improvement was significant. In an apples-to-apples comparison over the same window, Vercel handled 18,139 chats versus 21,105 on non-Vercel and still performed better across the board:

- Average latency improved 25.7%

- P95: 46s → 34s (25% improvement)

- P99: 131s → 81s (38% improvement)


For Zo's users, the P99 number matters most because they text their agents constantly throughout the day. A 131-second worst-case wait breaks that experience completely, but now 99% of requests complete in under 81 seconds.

> “131 seconds to wait for something is just terrible. Now we can get 99% of our requests in under 80, which is huge. 131 seconds to wait for something is just terrible. Now we can get 99% of our requests in under 80, which is huge. 131 seconds to wait for something is just terrible. Now we can get 99% of our requests in under 80, which is huge. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/74FcxHXbdsuXaXlg1vQ4TV/9652957571ff2a20a426ee34585ce45a/rob-cheung-zo.jpeg)
>
> **Rob Cheung,** co-founder and CEO @ Zo Computer

By the end of the test, 91.88% of Zo's traffic routed through Vercel, handling 3.3x larger context windows (42,500 average input tokens vs. 12,700) at a lower error rate than the non-Vercel path.

### [Link to heading](https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel\#scaling-to-a-million-personal-cloud-owners) Scaling to a million personal cloud owners

Vercel handles Zo's AI layer through AI SDK and AI Gateway and hosts their public-facing marketing site. With reliable AI infrastructure and no adapter code to maintain, the team can focus on the product instead of the plumbing.

With the pace of model developments in AI, Rob used to worry about the work required to keep up. “Now I don’t worry about it,” he said, “because with Vercel, the infrastructure just works.”

> “We're a tiny team, so we want to spend our effort in the right ways. It's really nice to lean on Vercel and trust that we can add hundreds of times more traffic. We're a tiny team, so we want to spend our effort in the right ways. It's really nice to lean on Vercel and trust that we can add hundreds of times more traffic. We're a tiny team, so we want to spend our effort in the right ways. It's really nice to lean on Vercel and trust that we can add hundreds of times more traffic. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/74FcxHXbdsuXaXlg1vQ4TV/9652957571ff2a20a426ee34585ce45a/rob-cheung-zo.jpeg)
>
> **Rob Cheung,** co-founder and CEO @ Zo Computer

Zo Computer is a personal AI cloud platform that gives every user their own cloud computer, housing data, services, and a personal agent. Users interact through a conversational interfaces like iMessage, or log in and use the environment directly. Founded two and a half years ago, Zo is an 8-person team based in New York City. Learn more at [zo.computer](http://zo.computer/).

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)