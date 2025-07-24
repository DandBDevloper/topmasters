// import Home_V1 from "./(home)/home-v1/page";
import Home_V2 from "./(home)/home-v2/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Off-Plan Properties in Dubai | New Launch Projects 2025",
  description: "Discover premium off-plan properties in Dubai with flexible payment plans, guaranteed ROI, and capital appreciation. Explore new launch residential and commercial projects from top developers.",
  keywords: "off-plan properties Dubai, new launch Dubai, Dubai off-plan investment, pre-launch properties Dubai, Dubai real estate projects, off-plan villas Dubai, off-plan apartments Dubai, Dubai property investment",
  authors: [{ name: "The Top Masters Real" }],
  openGraph: {
    title: "Off-Plan Properties in Dubai | Premium New Launch Projects",
    description: "Invest in Dubai's hottest off-plan properties with attractive payment plans and high ROI potential. Browse new launch residential and commercial developments from leading developers.",
    url: "https://thetopmasters.com/",
    siteName: "Your Site Name",
    images: [
      {
        url: "https://backend.thetopmasters.com/public/storage/areas/thumb_business-bay-1.webp",
        width: 1200,
        height: 630,
        alt: "Off-plan properties and new development projects in Dubai skyline",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Off-Plan Properties Dubai | New Launch Projects 2025",
    description: "Premium off-plan properties in Dubai with flexible payment plans and guaranteed returns. Explore new launch developments from top developers.",
    images: ["https://backend.thetopmasters.com/public/storage/areas/thumb_business-bay-1.webp"],
  },
  alternates: {
    canonical: "https://thetopmasters.com/",
  },
 };

export default function MainRoot() {
  return (
    <Wrapper>
      <Home_V2 />
    </Wrapper>
  );
}
