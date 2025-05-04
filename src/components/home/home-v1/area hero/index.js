import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./AreaHeroContent";

const AreaHero = ({areas}) => {
  console.log(areas);
  return (
    <>
      <div className="inner-banner-style1 text-center mt60">
        {/* <h6 className="hero-sub-title animate-up-1">THE BEST WAY TO FIND AREA</h6> */}
        <h2 className="hero-title animate-up-2">{areas.name}</h2>
        <p className="hero-text fz15 animate-up-3">
        A mixed-use development in the centre of the city
        </p>
        {/* <HeroContent /> */}
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default AreaHero;
