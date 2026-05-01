# CASE STUDY — durable-ai-saas

Profile: ai-native
Source: https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers

[Skip to content](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# 360 billion tokens, 3 million customers, 6 engineers

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/5o5CZNGvlw1dk6eS58ASNm/05bf2dc16f4a64a8dcac6f10620edebb/eric-dodds-128.jpg)\\
Eric DoddsContent Engineering Lead](https://twitter.com/ericdodds)

4 min read

Copy URL

Copied to clipboard!

Mar 18, 2026

## [Link to heading](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers\#impact-at-a-glance) Impact at a glance

- Durable ships new production agents to customers in a single day

- AI features and agents serve ~1.1B tokens per day (360B per year)

- 10x leverage for every engineer, product manager, and designer

- 3-4x lower infra cost compared to self hosting


Durable began with a simple goal: make owning a business easier than having a job.

60% of U.S. adults [say they want to be their own boss](https://news.gallup.com/poll/645593/desire-own-boss-widely-held.aspx), but only about 4% [actually do it](https://indicators.kauffman.org/reports/2021-early-stage-entrepreneurship-national). Durable’s bet is that the blocker isn’t ambition. It’s friction. “Small businesses are death by a thousand tools, logins, workflows, and designs,” explained James Clift, founder of Durable. “If you remove those barriers, business owners can focus on their customers.”

Today, [Durable](https://durable.com/) is an AI business builder that helps entrepreneurs launch in minutes, then optimize with agents that handle things like SEO, content, and operations. The gap between idea and ownership has never been smaller.

![Durable automates business websites, brand and creative assets, customer relationship management, and more.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2WhSJg5ftysCWFo7QjP9V%2F15ff8c8022b57b608b27539586ac6c77%2FDashboard.png&w=1920&q=75)Durable automates business websites, brand and creative assets, customer relationship management, and more.

It feels like one seamless experience to their customers, but under the hood it’s a multi-tenant, multi-product platform that has to run millions of individual businesses safely, reliably, and cost-effectively.

As they scaled, manually operating multiple services just to self-host was enough work to be a second product.

With a small team, Durable chose rapid consolidation over incremental improvement: one codebase, one infrastructure platform.

> “We realized we had to build Vercel, or we had to build on Vercel We realized we had to build Vercel, or we had to build on Vercel ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6pdXxSAjV7PECzfYK4hiTv/754b3cc42ff64ab5625f53ae830c33e2/osama-khan.png)
>
> **Osama Khan,** CPTO @ Durable

## [Link to heading](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers\#infra-is-hard;-multi-tenant-infra-is-harder) Infra is hard; multi-tenant infra is harder

Durable isn’t serving one app. They are managing millions of customer sites, CRMs, and agents, each with different traffic patterns and different operational needs.

One customer site might get 100x the traffic of another, and power laws show up quickly. When spikes happen, a small portion of Durable customers can consume a disproportionate share of compute, which made cost isolation, attribution, and pricing strategy significant engineering problems.

Khan called out a few of the most acute pain-points from self-hosting:

- **Custom domains and SSL at SaaS scale,** including paying thousands of dollars for SSL termination for custom domains

- **Multi-region cluster maintenance**, which previously required infrastructure engineers to keep clusters running across multiple geographies

- **Security and bot protection as a multi-tenant risk**, so that DDoS attacks aimed at one customer don’t degrade the performance of other sites

- **Observability and cost attribution** across millions of tenants


### [Link to heading](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers\#from-ai-as-plumbing-to-ai-as-product) From AI as plumbing to AI as product

Durable offers more than sites. They help their customers run businesses with a multi-agent, multi-model, multi-modal product.

![Durable's agents help entrepreneurs execute complex business processes in minutes.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1mPIar3dRnxhcWSH2pXD1B%2Fe3350d91ce61c70fff1cfd5f63bd650f%2FAI.png&w=1920&q=75)Durable's agents help entrepreneurs execute complex business processes in minutes.

Once agents became a core part of their platform, their developers ran into three problems that were fundamentally different from self-hosting a website platform:

1. **Model orchestration:** They needed to switch models and providers quickly for reliability and cost, without getting locked into long contracts or reworking the system every time there was an outage or a new model release.

2. **Tenant isolation:** In a multi-tenant agent system, “context spilling” is existential. Durable needed strict guardrails so one business’s context could never leak into another’s workflows.

3. **Per-customer AI economics:** AI workloads vary wildly, so Durable needed customer-level visibility into runs, models, and spend to support usage-based or outcome-based pricing with real fidelity.


Managing self-hosting and AI infrastructure was a massive distraction for Khan's team of six, so he chose to consolidate their platform into a single system designed for multi-tenant AI workloads.

## [Link to heading](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers\#the-migration,-and-why-it-worked) The migration, and why it worked

The team realized their existing stack was limiting their ability to solve their customer and platform problems quickly. They knew that in order to win, they needed to tackle those, and future challenges, faster than the competition. “We’re an AI native application,” Khan explained, “so we must focus on creating value with agents, not building out AWS infrastructure.”

Khan said that the simplicity of Vercel made their app migration possible. He described the infrastructure upgrade as a single, decisive swing they implemented before touching their code: "We skinned the old product using an iframe, pushed to production on Vercel, then ripped out the self-hosted infrastructure entirely."

They didn’t refactor the old way. With a lean team, Durable used coding agents to accelerate the rewrite, burning tokens to move faster as models improved, ultimately emerging with a production-quality codebase.

“Everyone tells you not to rewrite your product,” said Khan, “but we did exactly that, and it worked.”

Even though resource constraints weren't the motivation for the move, their new infrastructure turned out to be far more cost-efficient as well.

> “Everyone says Vercel is expensive, but our costs are 3-4x lower than when we self-hosted. Everyone says Vercel is expensive, but our costs are 3-4x lower than when we self-hosted. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6pdXxSAjV7PECzfYK4hiTv/754b3cc42ff64ab5625f53ae830c33e2/osama-khan.png)
>
> **Osama Khan,** CPTO @ Durable

Today, Durable’s entire stack runs on Vercel, and they can ship new agents to their customers in a single day.

|     |     |
| --- | --- |
| **Area of stack** | **What Durable uses on Vercel** |
| Build, ship, and run the app | Next.js, Functions, Fluid Compute, Turborepo, Flags, Toolbar |
| AI + agents | AI SDK, AI Gateway, Workflows, Skills |
| Edge delivery + multi-tenant routing | CDN, Domains (API), Cron |
| Security + abuse prevention | Firewall, Bot Protection, BotID, Sandbox |
| Observability + performance | Analytics, Speed Insights, OpenTelemetry |
| Data + output | Blob (public & private assets), Streamdown, json-renderer |

## [Link to heading](https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers\#10x-leverage-to-support-more-entrepreneurs) 10x leverage to support more entrepreneurs

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3wSB0FAaUAOxGB4H1ZVTEJ%2Fcc3af7d3aa433a17cc2f93e5224e107a%2FExample.png&w=1920&q=75)

Durable serves more than 3 million businesses. “Think about a 19-year-old selling chocolate-covered bananas at fairs, a holiday porch decoration business in Texas, a plumber who just got their license, and a tech exec who just got laid off,” said Khan. “Those are all Durable customers who are rejecting the 9-5 and building their own future as entrepreneurs.”

That’s impressive for 6 engineers and no DevOps team. James Clift, founder of Durable, feels like they've gotten 100x leverage running on Vercel.

> “Every engineer, PM, and designer can deliver 10x the output of what was possible a few years ago, and we serve 1.1 billion tokens a day without an infrastructure team.Every engineer, PM, and designer can deliver 10x the output of what was possible a few years ago, and we serve 1.1 billion tokens a day without an infrastructure team.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7v1u4T5hMqB3pk8O4SDd1C/380b3f702c7785778b20e8cd475966b3/james-clift.jpeg)
>
> **James Clift,** Founder @ Durable

"It’s incredible what we’ve shipped with such a lean team," Clift reflected. "This is how every tech company in the future will operate."

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)