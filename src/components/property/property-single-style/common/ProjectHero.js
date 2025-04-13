// import AdvanceFilterModal from "@/components/common/advance-filter";
// import EnquiryForm from "@/components/common/enquiry-form";
import Image from "next/image";
import Modal from "./Modal";

const ProjectHero = ({ image, title, developer }) => {
  // Make sure there's at least one image in the array
  const imageUrl = image ? image : 'https://d3h330vgpwpjr8.cloudfront.net/x/2400x/DAMAC_Islands_Dubai_Luxury_Villas_and_Townhouses_29bd7b568b.webp';

  return (
    <>
      <section className="pt0 pb0 projectHero">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt="Project Hero" 
            layout="fill" // Enables full-width and height
            className="HeroImg"
            style={{ objectFit: 'cover' }}
            priority={true}
          />
        ) : (
          <p>{imageUrl.image}</p>
        )}

        <div className="heroContent ">
            <div className="container heroMainContent">
                <h2 className=" animate-up-2">{title}</h2>
                <p >by {developer}</p>
                <p className="mb-4">Studio, 1 - 3 Apartments</p>
                {/* <div class="container sellingContainer">
                    <div class="row text-center py-4 w-100 sellingContent">
                        <div class="sellingPointItems">
                            <p class="mainHeading">Freehold</p>
                            <p class="subHeading">for All Nationalities</p>
                        </div>
                        <div class="sellingPointItems">
                            <p class="mainHeading">Pay 1%</p>
                            <p class="subHeading">Monthly</p>
                        </div>
                        <div class="sellingPointItems">
                            <p class="mainHeading">2 Years Post Handover</p>
                            <p class="subHeading">Payment Plan</p>
                        </div>
                    </div>
                </div> */}


                <div className="btnCtn">
                    <button className="ud-btn btn-thm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal">Download Brochure</button>
                    <button className="ud-btn btn-white"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModalRegister"
                    >Register Interest</button>
                </div>
            </div>
        </div>
      </section>

      {/* <!-- Advance Feature Modal Start --> */}
      <Modal id="advanceSeachModal" title="Download Brochure"/>
      <Modal id="advanceSeachModalRegister" title="Please Fill in the Form Below"/>
    </>
  );
};

export default ProjectHero;