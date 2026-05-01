# CASE STUDY — mintlify-multi-tenant-docs

Profile: next-native-scaling
Source: https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel

[Skip to content](https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# Mintlify: Scaling a powerful documentation platform with Vercel

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/5Q243GdJsPyPl19jneuqma/e78788347a4ad5a25cdbb7d3561997b3/alina-weinstein-128.jpg)\\
Alina WeinsteinSr. Product Marketing Manager](https://twitter.com/alina_weinstein)

2 min read

Copy URL

Copied to clipboard!

Jun 3, 2024

How this fast-growing startup built a documentation platform with thousands of custom domains on Vercel.

#### 2,500

Current active domains

[Talk to an Expert](https://vercel.com/contact/sales)

# Products Used

Next.js

Preview Deployments

Domains

ISR

[Mintlify](https://mintlify.com/), a platform for public documentation, is a toolkit for developers to write, maintain and host documentation. The platform offers a flexible solution that can be used out of the box or customized to fit specific needs, enabling developers to create help guides, tutorials, and API references.

### [Link to heading](https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel\#vercel:-the-foundation-for-scalable-documentation) **Vercel: The foundation for scalable documentation**

Mintlify has experienced rapid growth, onboarding thousands of users and seeing widespread adoption among Y Combinator startups. To support this growth, Mintlify relies on Vercel and Next.js to power its platform. Starting out, Mintlify faced scalability challenges with a single static Next.js app that they were cloning repeatedly which also lacked multitenancy capabilities. With Vercel, Mintlify was able to serve multiple customers across different subdomains or custom domains with a single unified codebase. This allowed them to host vast amounts of documentation and seamlessly scale to accommodate their growing user base, leaving the complexities of hosting, scaling, and infrastructure management to Vercel.

### [Link to heading](https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel\#multi-tenancy-toolkit) **Multi-tenancy toolkit**

With Vercel's platform, Mintlify is able to programmatically assign free unlimited custom domains, subdomains, and SSL certificates to their users without worrying about these scaling issues. Now, Mintlify's team can dedicate their time and resources to developing their core product and features. Today, Mintlify has 2,500 custom domains connected to their Vercel powered documentation platform, a key sign of customer engagement; someone adding a custom domain means they're truly invested in using Mintlify's docs.

> “Someone adding a custom domain means they're truly invested in using our docs. Vercel's ability to manage custom domains and SSL certificates has been a major time-saver for the Mintlify team.Someone adding a custom domain means they're truly invested in using our docs. Vercel's ability to manage custom domains and SSL certificates has been a major time-saver for the Mintlify team.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/11ZbVQA035tbF9lBw6pxuR/9abe7f131f3e4fee8202f7109747b24e/Hahnbee_Lee_-_Avatar.jpeg)
>
> **Hahnbee Lee**

### [Link to heading](https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel\#empower-teams-to-build-features,-not-infrastructure) **Empower teams to build features, not infrastructure**

- **Scalability:** Mintlify serves multiple customers across thousands of [custom domains](https://vercel.com/docs/projects/domains/working-with-domains#subdomains-wildcard-domains-and-apex-domains) and terabytes of documentation on a single Vercel project.

- **Performance:** Next.js and Vercel's global edge network deliver fast and efficient performance, crucial for a smooth user experience. With [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) (ISR) documentation updates are reflected instantly.

- **Automation:** Vercel's API allows Mintlify to automate custom domain setup and streamline [SSL certificate](https://vercel.com/docs/projects/domains/working-with-ssl) issuance.


> “Mintlify would not have been able to scale as quickly as it has without Next.js and Vercel. Multi-tenancy and all the custom domains connecting to one vercel project is so epic.Mintlify would not have been able to scale as quickly as it has without Next.js and Vercel. Multi-tenancy and all the custom domains connecting to one vercel project is so epic.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/11ZbVQA035tbF9lBw6pxuR/9abe7f131f3e4fee8202f7109747b24e/Hahnbee_Lee_-_Avatar.jpeg)
>
> **Hahnbee Lee**

Looking ahead, Mintlify is exploring ways to further leverage Vercel's infrastructure, including migrating their dashboard for improved performance. With Vercel as their trusted partner, Mintlify can continue to innovate and provide developers with the tools they need to create world-class documentation.

[**How to build a multi-tenant app with custom domains using Next.js**\\
\\
Create a full-stack application with multi-tenancy and custom domain support using Next.js App Router, Vercel Postgres, and the Vercel Domains API.\\
\\
Read the guide](https://vercel.com/guides/nextjs-multi-tenant-application)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)