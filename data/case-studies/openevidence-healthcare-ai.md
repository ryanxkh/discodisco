# CASE STUDY — openevidence-healthcare-ai

Profile: ai-native
Source: https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust

[Skip to content](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# How OpenEvidence built a healthcare AI that physicians actually trust

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/7vaUZljZD19zMKYXtZm6e9/850c85b2f7375d7910d235a2be9d3f7e/nic-vargus-128.jpg)\\
Nic VargusContent & Editorial](https://twitter.com/nic-vargus)

4 min read

Copy URL

Copied to clipboard!

Feb 25, 2026

Startup speed. Hospital reliability. Zero compromises.

Andy Yoon was scrolling through Slack when he saw the message: OpenEvidence had gone viral on TikTok.

Not "gaining traction.” _Actually_ viral, reaching around two million views in less than a week.

This is usually when you rally the troops, spin up emergency capacity, and start making phone calls you really didn't want to make.

Andy, Lead Frontend Engineer, did none of those things.

Instead, he watched the numbers climb. He checked the logs—everything green. Response times: still fast. Error rates: still near zero. Then he went back to whatever he was doing before, because there was nothing to fix.

"Vercel has just completely scaled with that usage," he says. "We've never had it fall over due to capacity or had to provision anything extra. Just being able to trust that it's there, to the point where we don't really even think about it, is amazing."

It was proof that they'd solved a problem most healthcare tech companies haven't figured out yet: how to move at startup speed while meeting hospital-grade reliability standards.

## [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#when-failure-isn't-an-option) **When failure isn't an option**

The stakes are different for companies like OpenEvidence. If their product fails, it could result in someone making a bad medical decision.

OpenEvidence is the most widely used clinical decision support platform among U.S. clinicians, supporting over 20 million clinical consultations in January 2026. Over 100 million Americans were treated by a doctor using OpenEvidence last year.

A general-purpose model can afford to be wrong, but a clinical tool cannot. Physicians expect speed, but they also expect stability, clarity, and trust.

This pressure sits on top of every technical decision at OpenEvidence: it has to work, every time.

## [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#a-frontend-engineer-and-a-team-of-python-developers) **A frontend engineer and a team of Python developers**

When Andy joined OpenEvidence about three years ago, he discovered something that would make most frontend engineers nervous: he was basically the only one.

"I was pretty much the only engineer on our team coming from an actual frontend background," he says. "Most of our team works in Python and machine learning."

They couldn't afford infrastructure that needed constant babysitting. They needed something that would just work. Deploy code, it goes live. Traffic increases, it scales.

So OpenEvidence uses a hybrid architecture. The backend is built in Python and runs on Google Cloud Platform. It handles data ingestion, model orchestration, and core business logic, while the frontend is built with Next.js and deployed on ‌Vercel. ‌﻿‌

"Given the makeup of our engineering team, Vercel has really scaled with our frontend so well," Andy notes.

Each commit deploys automatically. Production deploys take five minutes. Preview URLs appear for every branch. For a small team supporting millions of medical consultations daily for almost half of all physicians in the US, it’s been indispensable.

## [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#prototyping-at-speed) **Prototyping at speed**

Before OpenEvidence became what it is today, it was dozens of other things first. Each proof of concept was deployed on Vercel as its own project with a custom domain.

Vercel made it simple. Spin up a new project, connect a custom domain, push code, and you have what looks like a production environment. Stakeholders could click around and test workflows.

This ability to spin up projects in minutes helped the team find product-market fit. It also made it easier to win early enterprise partnerships.

When building out new features, preview deployments give them shareable links for live demos. Changes can be rolled out safely, because they can be reverted instantly if needed.

## [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#the-90%-surprise) **The 90% surprise**

As OpenEvidence scaled to 1000x growth, the lead infrastructure engineer, Micah Smith, kept a close eye on compute costs. When Vercel introduced Fluid compute, it changed how serverless workloads run—combining on-demand execution with server-like efficiency, lower latency, and better performance under load.

The team enabled Fluid compute to see what would happen, and their serverless spend dropped by 90%. Same reliability. Faster speed. Fewer cold starts.

### [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#%22we-reduced-our-serverless-spend-by-90%-while-maintaining-the-same-performance,-and-even-as-we've-scaled-up-to-1000x-growth,-vercel-is-less-than-5%-of-our-overall-infra-spend.%22--%E2%80%94micah-smith,-vp-engineering)"We reduced our serverless spend by 90% while maintaining the same performance, and even as we've scaled up to 1000x growth, Vercel is less than 5% of our overall infra spend." — _Micah Smith, VP Engineering_

The infrastructure is almost invisible, meaning more time spent on product experience and less time debugging tools or provisioning servers.

## [Link to heading](https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust\#threading-the-needle) **Threading the needle**

"A lot of doctors and medical professionals are used to really outdated software," Andy says.

He's not wrong. Hospital software often looks like it was designed in the '90s, but those tools are reliable. OpenEvidence has to thread the needle, building a modern solution that upholds the reliability bar.

Their viral moment proved the platform could handle a sudden influx while maintaining hospital-grade reliability.

It did.

Since launching, OpenEvidence has grown to serve over 40% of physicians in the United States. The frontend team is still small. The infrastructure still just works.

_**About OpenEvidence:**_ _OpenEvidence is the fastest-growing clinical decision support platform in the United States, and the most widely used medical search engine among U.S. clinicians. OpenEvidence is trusted by hundreds of thousands of verified healthcare professionals to make high-stakes clinical decisions at the point of care that are sourced, cited, and grounded in peer-reviewed medical literature. Founded with the mission to help doctors save lives and improve patient care, OpenEvidence is actively used daily, on average, by over 40% of physicians in the United States, spanning more than 10,000 hospitals and medical centers nationwide. Learn more at_ [_openevidence.com._](https://openevidence.com./)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)