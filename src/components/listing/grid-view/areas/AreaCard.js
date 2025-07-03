import Image from 'next/image';
import Link from 'next/link';

export default function AreaCard({ area }) {
  // Format price function
  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    return `AED ${price.toLocaleString()}`;
  };

  // Format property count
  const formatPropertyCount = (count) => {
    if (!count || count === 0) return 'No Properties Available';
    return `${count} Properties Available`;
  };

  // Get fallback image
  const getImageSrc = () => {
    if (area.img_url) return area.img_url;
    return '/images/default-area.jpg'; // Fallback image
  };

  return (
    <div className="listing-style1">
      <div className="list-thumb">
        <Image
          width={382}
          height={248}
          className="w-100 cover"
          src={getImageSrc()}
          alt={area.name}
          onError={(e) => {
            e.target.src = '/images/default-area.jpg';
          }}
        />
      </div>
      
      <div className="list-content">
        {/* <div className="list-price mb-2">
          <span className=" fw-bold">
            Starting from {formatPrice(area.starting_price)}
          </span>
        </div> */}
        
        <h6 className="list-title">
          <Link href={`/areas/${area.id}`}>
            {area.name}
          </Link>
        </h6>
        
        <div className="list-meta d-flex align-items-center">
          <div className="me-auto">
            <span className="text-muted">
              <i className="fas fa-building me-1"></i>
              {formatPropertyCount(area.count_properties)}
            </span>
          </div>
        </div>
        
        <div className="list-footer d-flex justify-content-between align-items-center mt-3">
          <div className="list-date">
            <span className="text-muted small">
              Updated: {new Date(area.updated_at).toLocaleDateString()}
            </span>
          </div>
          
          <Link href={`/areas/${area.id}`} className="btn btn-sm ">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}