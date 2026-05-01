# CASE STUDY — serhant-ai-real-estate

Profile: ai-native
Source: https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration

[Skip to content](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# SERHANT.'s playbook for rapid AI iteration

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/5o5CZNGvlw1dk6eS58ASNm/05bf2dc16f4a64a8dcac6f10620edebb/eric-dodds-128.jpg)\\
Eric DoddsContent Engineering Lead](https://twitter.com/ericdodds)

5 min read

Copy URL

Copied to clipboard!

Mar 23, 2026

## [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#impact-at-a-glance-) Impact at a glance

- Started with Next.js on Vercel, which made it easier to expand to a React Native iOS app without rebuilding their backend

- Engineers focus on AI design and iteration instead of platform plumbing

- Orchestrates OpenAI, Claude, and Gemini by task to optimize cost vs output

- Scaled from an internal pilot to 800–900+ real estate agents without replatforming


When Jeremy Bunting joined SERHANT. as VP of Engineering in February 2024, [S.MPLE](https://www.serhant.com/simple) was already showing promise. 200 real estate agents were piloting the AI product, which was designed to save time by automating cumbersome and repetitive daily tasks, like market analysis and contact management.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FLRfLWwrzRuoTuNRTYd15z%2F7c4a018c6135587eab721ffc40b33912%2FSMPLE-Website-PR-3-03.webp&w=1920&q=75)

S.MPLE was a Next.js progressive web app deployed on Vercel, and that foundation gave the team leverage. They could keep the API layer steady while expanding the client experience, including expansion to a React Native iOS app, all without a backend rebuild.

But Bunting had a problem that keeps many engineering leaders up at night: the AI landscape changes faster than most teams can implement infrastructure updates.

The team needed to move fast, scale confidently, and stay flexible enough to swap models, add new capabilities, and adapt to the rapidly changing AI landscape. Traditional approaches meant choosing between velocity and flexibility, but Bunting wanted both.

### [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#ai-sdk:-moving-fast-without-vendor-lock-in) AI SDK: Moving fast without vendor lock-in

As S.MPLE shifted from "one model” experiments to a production AI product, Bunting's team started evaluating [Vercel's AI SDK](https://ai-sdk.dev/), and he initially had concerns. "I asked, how much is this going to tie us in directly to Vercel?" he recalls.

Then one of his engineers pushed back. The AI SDK wasn't infrastructure lock-in, it was infrastructure independence. “It's just an SDK that abstracts away the complexity of working with different model providers”, the engineer pointed out.

Bunting also realized that if the team picked one frontier model and built tightly around it, every future change would come with a rewrite, with no clean path to fallback when reliability or cost shifted. With AI SDK, iteration meant simple configuration changes, not feature overhauls. "We are building agentic tools," said Bunting. "Having that consistent abstraction layer... really reduces the cognitive load."

> “We are building agentic tools. Having that consistent abstraction layer across the app for our developers really reduces the cognitive load of understanding how to work with each of the models and services. We are building agentic tools. Having that consistent abstraction layer across the app for our developers really reduces the cognitive load of understanding how to work with each of the models and services. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6thW3bd5uOFRkF2d2vJtUF/4d1e585b6747fdca7495c192322cb7d9/jeremy-bunting.jpeg)
>
> **Jeremy Bunting,** VP of Engineering @ SERHANT.

[AI Gateway](https://vercel.com/ai-gateway) added another layer of leverage: consolidated visibility into usage across apps and prototypes, even when teams bring their own keys. The result is faster debugging, faster optimization, and a clearer feedback loop on cost.

## [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#using-multiple-models-to-balance-cost,-speed,-and-complexity) Using multiple models to balance cost, speed, and complexity

Because the SERHANT. S.MPLE team was not spending its time rebuilding infrastructure or maintaining one-off AI integrations, they could shift their attention to testing models against real product tasks and choosing the right tool for each job:

- **Claude Sonnet** for complex, accuracy-critical analysis like comparative market analysis, where strong structured-data reasoning matters

- **Claude Haiku** for lightweight intent and field-filling tasks where speed matters

- **OpenAI models** for conversational voice and general chat behaviors

- **Gemini** for image generation, browser automation, and computer-use workflows where reliability and speed are the priority


They are also experimenting with “models as guardrails” to validate or critique outputs, and with caching strategies to rein in token spend as usage grows.

## [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#worry-free-scale:-adding-users-and-assets) Worry-free scale: Adding users and assets

The value of their stack decisions became clear when S.MPLE launched publicly. "We moved from being an internal pilot program to more than 900 users without a lot of worry on infrastructure or scale," Bunting says. The API layer didn't require a single change, and [Fluid compute](https://vercel.com/docs/fluid-compute) handled the increase in workloads automatically.

That seamless scale matters because SERHANT. operates at a content generation pace that would break most systems. "SERHANT. generates about 35% more content than the top five brokerages combined," Bunting notes. Between property videos, listing descriptions, marketing materials, and now AI-generated assets, the volume is staggering.

Greg Parsons, Technical Director on the S.MPLE team, said that AI Gateway gives him visibility across their platform that wasn’t possible before. "We can gain insight into all of the disparate applications we are building across the business," Parsons explained.

> “We can gain insight into all of the disparate applications we are building across the business, from early prototypes to fully launched products, by bringing everything into a single view. This gives us unified visibility into token usage, API calls, and overall system output, all within one UI.We can gain insight into all of the disparate applications we are building across the business, from early prototypes to fully launched products, by bringing everything into a single view. This gives us unified visibility into token usage, API calls, and overall system output, all within one UI.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/30wJLedC00VT0s88esz2ry/7e14e89c055e23f4453a0ff06b618a91/greg-parsons.jpeg)
>
> **Greg Parsons,** Technical Director @ SERHANT.

### [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#what%E2%80%99s-next:-from-linear-workflows-to-conversational-ai-agents) What’s next: from linear workflows to conversational AI agents

S.MPLE began with linear workflows: real estate agents would trigger a single action, it would run end-to-end then return the result.

But real-world workflows are more complex and users want to execute multiple tasks in a single run, like producing all of the assets needed to market a property listing. Bunting’s team is now building toward conversational experiences where humans can run agents, steer and correct mid-flight, and combine multiple “recipes” into a single request.

It is a shift from one-off automations to a coordinated network of specialized agents, built to evolve as fast as the AI ecosystem itself.

## [Link to heading](https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration\#future-proofing-an-unpredictable-landscape) Future-proofing an unpredictable landscape

Greg Chan, SERHANT.’s CTO, sees flexibility as the point. "In AI, things are evolving fast. What it looks like now is different than even three-to-six months ago. And it’ll be different months from now," Chan says.

For Chan, the win is that the team can keep building inside the ecosystem instead of rewriting the stack every time the world changes. "The last thing we want is to rebuild our stack every time a new model drops," he said.

> “The last thing we want is to rebuild our stack every time a new model drops. Flexibility with Vercel means we can adapt instantly and keep our engineers focused on building real competitive advantage for our agents.The last thing we want is to rebuild our stack every time a new model drops. Flexibility with Vercel means we can adapt instantly and keep our engineers focused on building real competitive advantage for our agents.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/4YrfWTUgLzGIcZUwc6aaa0/bc842bc6c37f6094bb43155ba1bc8581/greg-chan.jpeg)
>
> **Greg Chan,** CTO @ SERHANT.

**About SERHANT.**

SERHANT. is an AI-native real estate and media company, and is the most-followed real estate brand in the world.

Founded in 2020 by top real estate broker and entrepreneur Ryan Serhant, SERHANT. brings together brokerage, media, and education, with proprietary technology to revolutionize how properties are marketed, sold, and experienced.

SERHANT. sells residential, commercial, luxury, and new development properties nationally through its specialized divisions, including SERHANT. Signature for high-net-worth clients and SERHANT. New Development, which delivers end-to-end branding, marketing, and sales for ground-up residential projects.

Powered by S.MPLE, SERHANT.’s proprietary AI platform, agents are empowered with real-time data and workflow automation across listings, transactions, and marketing to deliver faster, smarter, and more impactful results while saving time.  Award-winning SERHANT. Studios produces original content across social and streaming platforms, while SellIt.com is the company’s digital education hub, engaging members globally in more than 130 countries.

Learn more at [serhant.com](https://serhant.com/).

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)