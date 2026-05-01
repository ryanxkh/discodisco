# CASE STUDY — motortrend-deploy-velocity

Profile: media-publishing
Source: https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel

[Skip to content](https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# MotorTrend: Shifting into overdrive with Vercel

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/9zl3WeU5T1TMNXxVRvirW/fd05fc156bf59e77926d7d9f0a5e723d/dan-fein-128.jpg)\\
Dan FeinProduct](https://twitter.com/dfeinition)

3 min read

Copy URL

Copied to clipboard!

Nov 7, 2024

How a performance-first approach drives business value.

#### 18 days to 10 min

Feature release timeline

#### 7x faster

Build times

[Talk to an Expert](https://vercel.com/contact/sales)

[**Powered by** AWS](https://vercel.com/partners/aws)

[MotorTrend](https://www.motortrend.com/)—a Warner Bros. Discovery company and the world’s leading media company on all things automotive—needed a digital experience as powerful as the vehicles they showcase. Bogged down by a legacy tech stack, their development team faced frustratingly long build times and a cumbersome release process. They knew a complete redesign wasn't the answer—they needed a platform upgrade.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3fEOMnwguww20onqSEklmu%2F983c3bf1ae66e37df1a08a8e8bc3144b%2FCleanShot_2024-08-14_at_14.48.49.png&w=1920&q=75)

## [Link to heading](https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel\#reducing-build-times-and-accelerating-developer-iteration) **Reducing build times and accelerating developer iteration**

MotorTrend's previous infrastructure and CI/CD pipelines—a self-managed setup using GitHub, Jenkins, and AWS—resulted in long build times and lengthy release cycles, delaying feature development and deployments. With Vercel, they saw a dramatic improvement, reducing build times by up to 7 times and enabling rapid feature releases.

![Before Vercel, MotorTrend's deployment process hinged on a single Release Candidate, where any feature failure could delay the entire release for weeks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3aCnswJAv6OSJJWFfnx3qt%2F0094a3a1ac344d0b5e3d39fed112e7e3%2FMotorTrend_Before_-_Light.png&w=1920&q=75)![Before Vercel, MotorTrend's deployment process hinged on a single Release Candidate, where any feature failure could delay the entire release for weeks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7IRnorHuDEievaioQS1Hk7%2Fe5c94189258ac95c4f93daa9871de25a%2FMotorTrend_Before_-_Dark.png&w=1920&q=75)![Before Vercel, MotorTrend's deployment process hinged on a single Release Candidate, where any feature failure could delay the entire release for weeks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3X6cOCR79iYm3sZOZfMCz2%2Fe9e4724a9b1a83da82d8a39b6ddc26bf%2F414w_x_vh.png&w=1920&q=75)![Before Vercel, MotorTrend's deployment process hinged on a single Release Candidate, where any feature failure could delay the entire release for weeks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6m2SAiFkptUqExUGYe8cUW%2Fa2961ae9e5d20159d5e974b668abc01f%2F414w_x_vh-1.png&w=1920&q=75)Before Vercel, MotorTrend's deployment process hinged on a single Release Candidate, where any feature failure could delay the entire release for weeks.

The faster build times and automatic [preview deployments](https://vercel.com/docs/deployments/preview-deployments) enabled the team to move from idea to prototype to preview, and ultimately production at a much faster pace. The team now focuses on feature development and iteration without being slowed by lengthy build and deployment processes and timed-release constraints.

The team's average feature release timeline from 18.9 days to just 10 minutes. This improvement transformed cross-team collaboration at MotorTrend by allowing teams to focus less on technical details and more on strategic, high-impact discussions.

> “With Vercel, Instant Rollbacks and Preview URLs are top-notch. We've been able to release and test so much faster.With Vercel, Instant Rollbacks and Preview URLs are top-notch. We've been able to release and test so much faster.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/3P4WyLMqjE38ljmEotJxcH/ef8fcaf5c42f3569f19f0746eb863616/E7T3R16EM-U04A83K6D8U-3032c2f62b1e-512.jpeg)
>
> **Arun Kambhammettu,** Senior Software Engineering Manager at Warner Bros. Discovery

With [development previews](https://vercel.com/products/previews) available [per git push](https://vercel.com/docs/deployments/git), per branch, even large companies can iterate quickly without conflicts. Vercel creates deployments on a per-branch basis, with only the "main" branch promoting deployments to production and being assigned to customer domains. This allows isolated environments for testing production-grade code, protected by authentication. This workflow is embedded by default for all plans, eliminating the need for custom CI/CD pipelines or integrating seamlessly into existing ones.

Once prototyped, the MotorTrend team shares the idea with Product and QA for approval. After receiving a reviewer's OK, passing component tests, and resolving comments via the Vercel Toolbar, a pull request can be approved. Finally, Vercel builds and deploys the application.

![With Vercel, MotorTrend developers can now push, preview, and promote features to production anytime, independently of other features or branches.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2wjNEe8W1qyS7Qacd3KVG5%2Fef719c197941eb138875b271542d1f9c%2FMotorTrend_After_-_Light.png&w=1920&q=75)![With Vercel, MotorTrend developers can now push, preview, and promote features to production anytime, independently of other features or branches.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3GUOBxXm7s3W9gsaxoSuEZ%2Fee05cb76e39589942104f081e17f02e3%2FMotorTrend_After_-_Dark.png&w=1920&q=75)![With Vercel, MotorTrend developers can now push, preview, and promote features to production anytime, independently of other features or branches.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FfWYH01Xkkpicxbou6rtMI%2Fa8757c88240d7a605417e93bd0a924b2%2F414w_x_vh-3.png&w=1920&q=75)![With Vercel, MotorTrend developers can now push, preview, and promote features to production anytime, independently of other features or branches.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FTkeL5lljWdOg3UJCuKYDf%2F84cf8dac1bef4f7c15eff4d229a4ad35%2F414w_x_vh-2.png&w=1920&q=75)With Vercel, MotorTrend developers can now push, preview, and promote features to production anytime, independently of other features or branches.

Previously, building the application—compiling the approved code for production—was a significant bottleneck in MotorTrend's workflow, often taking around 42 minutes. By adopting Next.js and deploying on Vercel, this process was streamlined to a mere 6 minutes. This rapid turnaround allowed developers to see their changes reflected almost instantly, minimizing context switching and further accelerating development cycles.

> “Previously, we faced challenges with environment differences across staging, development, pre-production, and production, but once we moved everything to Vercel, it was seamless. We didn't notice any environment differences at all.Previously, we faced challenges with environment differences across staging, development, pre-production, and production, but once we moved everything to Vercel, it was seamless. We didn't notice any environment differences at all.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/3P4WyLMqjE38ljmEotJxcH/ef8fcaf5c42f3569f19f0746eb863616/E7T3R16EM-U04A83K6D8U-3032c2f62b1e-512.jpeg)
>
> **Arun Kambhammettu,** Senior Software Engineering Manager at Warner Bros. Discovery

## [Link to heading](https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel\#fueling-business-growth-with-performance) **Fueling business growth with performance**

Vercel’s [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) (Fdi) allows MotorTrend to deploy their [Next.js](https://nextjs.org/) application efficiently, removing the need for complex cloud infrastructure management. By utilizing the [Vercel Edge Network](https://vercel.com/docs/edge-network/overview), MotorTrend's site loads faster for users, leading to more ad impressions per page view and boosting revenue without requiring a redesign. This demonstrates the strong connection between optimized workflows, website performance, and business growth. The increase in ad impressions is directly linked to faster site speeds.

MotorTrend continues to optimize by using Vercel's Real Experience data within [Vercel Speed Insights](https://vercel.com/docs/speed-insights), providing detailed insights into their site's performance from real users. This data-driven strategy ensures continuous user experience improvements. They are also migrating their APIs to Next.js, enhancing performance, scalability, and maintainability. With sections like News and Buyers Guides already on Vercel—and the rest soon to follow—MotorTrend is committed to a performance-first future.

Vercel is proud to partner with MotorTrend, enabling them to effortlessly handle increased demand, ensure top-tier performance, accelerate feature releases, and drive continuous improvement with data-driven insights, all while delivering exceptional digital experiences to automotive enthusiasts worldwide.

## Explore

[Vercel.com landing page\\
\\
**Learn more about Vercel Preview Deployments**](https://vercel.com/features/previews) [Blog post\\
\\
Mar 7, 2023\\
\\
**Framework-defined infrastructure** \\
\\
![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/4iicDbTA4KX4io2f2PPx7q/b11dbc333322bc5a0087056d162cb5cf/malte.ubl.jpg)\\
\\
Malte Ubl](https://vercel.com/blog/framework-defined-infrastructure)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)