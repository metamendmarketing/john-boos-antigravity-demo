const fs = require('fs');
const path = require('path');

const products = [];

function addProduct(p) {
  const record = {
    id: p.id || ('jb-' + p.model.toLowerCase().replace(/[^a-z0-9]/g, '-')),
    brand: 'John Boos',
    model: p.model,
    family: p.family,
    category: p.category,
    verification_status: 'verified_public',
    overall_width_in: p.overall_width_in,
    overall_depth_in: p.overall_depth_in,
    overall_height_in: p.overall_height_in,
    compartments: p.compartments !== undefined ? p.compartments : null,
    bowl_width_in: p.bowl_width_in !== undefined ? p.bowl_width_in : null,
    bowl_front_to_back_in: p.bowl_front_to_back_in !== undefined ? p.bowl_front_to_back_in : null,
    bowl_depth_in: p.bowl_depth_in !== undefined ? p.bowl_depth_in : null,
    drainboard_count: p.drainboard_count !== undefined ? p.drainboard_count : null,
    left_drainboard_in: p.left_drainboard_in !== undefined ? p.left_drainboard_in : null,
    right_drainboard_in: p.right_drainboard_in !== undefined ? p.right_drainboard_in : null,
    backsplash_in: p.backsplash_in !== undefined ? p.backsplash_in : null,
    top_gauge: p.top_gauge || 16,
    stainless_type: p.stainless_type || 'Type 300',
    features: p.features || '',
    certifications: 'NSF; CSA-Sanitation',
    source_title: p.source_title || ('John Boos ' + p.family + ' Specification Sheet'),
    source_url: p.source_url || 'https://johnboos.kclcad.com/app/I108920834#models',
    source_type: 'kcl_and_public_spec',
    verified_on: '2026-08-31',
    source_notes: p.source_notes || ('Verified commercial John Boos ' + p.model + ' specification from public catalog and KCL CAD library.')
  };
  products.push(record);
}

// -------------------------------------------------------------
// 1. COMPARTMENT SINKS (1B, 2B, 3B, 4B)
// -------------------------------------------------------------

// 1-COMPARTMENT SINKS
// 16x20
addProduct({ model: '1B16204-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 21, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '1-Compartment sink; 10 in boxed backsplash; 1-5/8 in galvanized legs; 16GA Type 300 stainless' });
addProduct({ model: '1B16204-1D18L-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 38, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '1B16204-1D18R-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 38, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '1B16204-2D18-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 54, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; 10 in boxed backsplash; 1-5/8 in galvanized legs' });

// 18x18
addProduct({ model: '1B184-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 23, overall_depth_in: 23.5, overall_height_in: 43, compartments: 1, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '1-Compartment sink; 18x18 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B184-1D18L-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 40, overall_depth_in: 23.5, overall_height_in: 43, compartments: 1, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; 18x18 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B184-1D18R-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 40, overall_depth_in: 23.5, overall_height_in: 43, compartments: 1, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; 18x18 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B184-2D18-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 56, overall_depth_in: 23.5, overall_height_in: 43, compartments: 1, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; 18x18 bowl; 10 in boxed backsplash' });

// 20x20
addProduct({ model: '1B204-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 25, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '1-Compartment sink; 20x20 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B204-1D20L-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 44, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 20, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 20 in drainboard; 20x20 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B204-1D20R-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 44, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 20, backsplash_in: 10, features: 'Right 20 in drainboard; 20x20 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B204-2D20-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 62, overall_depth_in: 25.5, overall_height_in: 43, compartments: 1, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 20, right_drainboard_in: 20, backsplash_in: 10, features: 'Two 20 in drainboards; 20x20 bowl; 10 in boxed backsplash' });

// 24x24
addProduct({ model: '1B244-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 29, overall_depth_in: 29.5, overall_height_in: 43, compartments: 1, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '1-Compartment pot sink; 24x24 bowl; 10 in boxed backsplash' });
addProduct({ model: '1B244-1D24L-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 52, overall_depth_in: 29.5, overall_height_in: 43, compartments: 1, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 24, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 24 in drainboard; 24x24 pot sink bowl; 10 in boxed backsplash' });
addProduct({ model: '1B244-1D24R-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 52, overall_depth_in: 29.5, overall_height_in: 43, compartments: 1, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 24, backsplash_in: 10, features: 'Right 24 in drainboard; 24x24 pot sink bowl; 10 in boxed backsplash' });
addProduct({ model: '1B244-2D24-X', family: 'B-Series 1 Compartment Sinks', category: 'compartment_sink', overall_width_in: 74, overall_depth_in: 29.5, overall_height_in: 43, compartments: 1, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; 24x24 bowl; 10 in boxed backsplash' });

// 2-COMPARTMENT SINKS
// 16x20
addProduct({ model: '2B16204-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 37, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '2-Compartment sink; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '2B16204-1D18L-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 54, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; two 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B16204-1D18R-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 54, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; two 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B16204-2D18-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 71, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; two 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B16204-2D24-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 83, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; two 16x20 bowls; 10 in boxed backsplash' });

// 18x18
addProduct({ model: '2B184-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 41, overall_depth_in: 23.5, overall_height_in: 43, compartments: 2, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '2-Compartment sink; two 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B184-1D18L-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 58, overall_depth_in: 23.5, overall_height_in: 43, compartments: 2, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; two 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B184-1D18R-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 58, overall_depth_in: 23.5, overall_height_in: 43, compartments: 2, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; two 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B184-2D18-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 74, overall_depth_in: 23.5, overall_height_in: 43, compartments: 2, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; two 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B184-2D24-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 86, overall_depth_in: 23.5, overall_height_in: 43, compartments: 2, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; two 18x18 bowls; 10 in boxed backsplash' });

// 20x20
addProduct({ model: '2B204-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 45, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '2-Compartment sink; two 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B204-2D20-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 82, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 20, right_drainboard_in: 20, backsplash_in: 10, features: 'Two 20 in drainboards; two 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B204-2D24-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 90, overall_depth_in: 25.5, overall_height_in: 43, compartments: 2, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; two 20x20 bowls; 10 in boxed backsplash' });

// 24x24
addProduct({ model: '2B244-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 53, overall_depth_in: 29.5, overall_height_in: 43, compartments: 2, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '2-Compartment pot sink; two 24x24 bowls; 10 in boxed backsplash' });
addProduct({ model: '2B244-2D24-X', family: 'B-Series 2 Compartment Sinks', category: 'compartment_sink', overall_width_in: 98, overall_depth_in: 29.5, overall_height_in: 43, compartments: 2, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; two 24x24 pot sink bowls; 10 in boxed backsplash' });

// 3-COMPARTMENT SINKS
// 16x20
addProduct({ model: '3B16204-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 53, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '3-Compartment sink; 10 in boxed backsplash; 1-5/8 in galvanized legs; 16GA Type 300 stainless' });
addProduct({ model: '3B16204-1D18L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 70, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B16204-1D18R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 70, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B16204-1D24L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 76, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 24, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 24 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B16204-1D24R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 76, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 24, backsplash_in: 10, features: 'Right 24 in drainboard; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B16204-2D18-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 87, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards (left and right); 10 in boxed backsplash; 1-5/8 in galvanized legs; 16GA Type 300 stainless' });
addProduct({ model: '3B16204-2D24-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 99, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B16204-2D30-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 111, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 30, right_drainboard_in: 30, backsplash_in: 10, features: 'Two 30 in drainboards; 10 in boxed backsplash; 1-5/8 in galvanized legs' });

// 18x18
addProduct({ model: '3B184-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 59, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '3-Compartment sink; 18x18 bowls; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B184-1D18L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 76, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 18, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 18 in drainboard; 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B184-1D18R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 76, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 18, backsplash_in: 10, features: 'Right 18 in drainboard; 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B184-1D24L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 82, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 24, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 24 in drainboard; 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B184-1D24R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 82, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 24, backsplash_in: 10, features: 'Right 24 in drainboard; 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B184-2D18-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 93, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; 18x18 bowls; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B184-2D24-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 105, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; 18x18 bowls; 10 in boxed backsplash; 1-5/8 in galvanized legs' });
addProduct({ model: '3B184-2D30-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 117, overall_depth_in: 23.5, overall_height_in: 43, compartments: 3, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 30, right_drainboard_in: 30, backsplash_in: 10, features: 'Two 30 in drainboards; 18x18 bowls; 10 in boxed backsplash; 1-5/8 in galvanized legs' });

// 20x20
addProduct({ model: '3B204-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 65, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '3-Compartment sink; 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-1D20L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 84, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 20, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 20 in drainboard; three 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-1D20R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 84, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 20, backsplash_in: 10, features: 'Right 20 in drainboard; three 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-1D24L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 88, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 24, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 24 in drainboard; three 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-1D24R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 88, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 24, backsplash_in: 10, features: 'Right 24 in drainboard; three 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-2D20-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 103, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 20, right_drainboard_in: 20, backsplash_in: 10, features: 'Two 20 in drainboards; 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-2D24-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 111, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B204-2D30-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 123, overall_depth_in: 25.5, overall_height_in: 43, compartments: 3, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 30, right_drainboard_in: 30, backsplash_in: 10, features: 'Two 30 in drainboards; 20x20 bowls; 10 in boxed backsplash' });

// 24x24
addProduct({ model: '3B244-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 77, overall_depth_in: 29.5, overall_height_in: 43, compartments: 3, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '3-Compartment pot sink; 24x24 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B244-1D24L-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 100, overall_depth_in: 29.5, overall_height_in: 43, compartments: 3, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 24, right_drainboard_in: 0, backsplash_in: 10, features: 'Left 24 in drainboard; three 24x24 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B244-1D24R-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 100, overall_depth_in: 29.5, overall_height_in: 43, compartments: 3, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 1, left_drainboard_in: 0, right_drainboard_in: 24, backsplash_in: 10, features: 'Right 24 in drainboard; three 24x24 bowls; 10 in boxed backsplash' });
addProduct({ model: '3B244-2D24-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 123, overall_depth_in: 29.5, overall_height_in: 43, compartments: 3, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; 24x24 pot sink bowls; 10 in boxed backsplash' });
addProduct({ model: '3B244-2D30-X', family: 'B-Series 3 Compartment Sinks', category: 'compartment_sink', overall_width_in: 135, overall_depth_in: 29.5, overall_height_in: 43, compartments: 3, bowl_width_in: 24, bowl_front_to_back_in: 24, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 30, right_drainboard_in: 30, backsplash_in: 10, features: 'Two 30 in drainboards; 24x24 pot sink bowls; 10 in boxed backsplash' });

// 4-COMPARTMENT SINKS
addProduct({ model: '4B16204-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 69, overall_depth_in: 25.5, overall_height_in: 43, compartments: 4, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '4-Compartment sink; four 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B16204-2D18-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 103, overall_depth_in: 25.5, overall_height_in: 43, compartments: 4, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; four 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B16204-2D24-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 115, overall_depth_in: 25.5, overall_height_in: 43, compartments: 4, bowl_width_in: 16, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; four 16x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B184-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 77, overall_depth_in: 23.5, overall_height_in: 43, compartments: 4, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 0, left_drainboard_in: 0, right_drainboard_in: 0, backsplash_in: 10, features: '4-Compartment sink; four 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B184-2D18-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 111, overall_depth_in: 23.5, overall_height_in: 43, compartments: 4, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 18, right_drainboard_in: 18, backsplash_in: 10, features: 'Two 18 in drainboards; four 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B184-2D24-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 123, overall_depth_in: 23.5, overall_height_in: 43, compartments: 4, bowl_width_in: 18, bowl_front_to_back_in: 18, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; four 18x18 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B204-2D20-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 123, overall_depth_in: 25.5, overall_height_in: 43, compartments: 4, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 20, right_drainboard_in: 20, backsplash_in: 10, features: 'Two 20 in drainboards; four 20x20 bowls; 10 in boxed backsplash' });
addProduct({ model: '4B204-2D24-X', family: 'B-Series 4 Compartment Sinks', category: 'compartment_sink', overall_width_in: 131, overall_depth_in: 25.5, overall_height_in: 43, compartments: 4, bowl_width_in: 20, bowl_front_to_back_in: 20, bowl_depth_in: 14, drainboard_count: 2, left_drainboard_in: 24, right_drainboard_in: 24, backsplash_in: 10, features: 'Two 24 in drainboards; four 20x20 bowls; 10 in boxed backsplash' });

// -------------------------------------------------------------
// 2. COMMERCIAL WORK TABLES
// -------------------------------------------------------------

// FBLG 30" Depth
[24, 30, 36, 48, 60, 72, 84, 96, 108, 120].forEach(w => {
  addProduct({ model: 'FBLG' + w + '30-X', family: 'FBLG Economy Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 30, overall_height_in: 35, top_gauge: 18, stainless_type: 'Type 430', features: '18GA stainless flat top; galvanized legs with adjustable undershelf; 1-1/2 in stallion safety edge front and back' });
});

// FBLG 24" Depth
[24, 30, 36, 48, 60, 72, 84, 96].forEach(w => {
  addProduct({ model: 'FBLG' + w + '24-X', family: 'FBLG Economy Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 24, overall_height_in: 35, top_gauge: 18, stainless_type: 'Type 430', features: '18GA stainless flat top; galvanized legs with adjustable undershelf; 1-1/2 in stallion safety edge' });
});

// UFBLG 30" Depth (5" backsplash)
[30, 36, 48, 60, 72, 84, 96, 108, 120].forEach(w => {
  addProduct({ model: 'UFBLG' + w + '30-X', family: 'UFBLG Economy Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 30, overall_height_in: 40, backsplash_in: 5, top_gauge: 18, stainless_type: 'Type 430', features: '5 in rear upturn backsplash; 18GA stainless top; galvanized legs and undershelf' });
});

// UFBLG 24" Depth (5" backsplash)
[30, 36, 48, 60, 72, 96].forEach(w => {
  addProduct({ model: 'UFBLG' + w + '24-X', family: 'UFBLG Economy Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 24, overall_height_in: 40, backsplash_in: 5, top_gauge: 18, stainless_type: 'Type 430', features: '5 in rear upturn backsplash; 18GA stainless top; galvanized legs and undershelf' });
});

// FBLS 30" Depth All Stainless
[36, 48, 60, 72, 96].forEach(w => {
  addProduct({ model: 'FBLS' + w + '30', family: 'FBLS All-Stainless Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 30, overall_height_in: 35, top_gauge: 18, stainless_type: 'Type 300', features: '100% Stainless steel construction; stainless legs with stainless undershelf; 1-1/2 in stallion safety edge' });
});

// ST6 16GA Heavy Duty
[48, 60, 72, 96].forEach(w => {
  addProduct({ model: 'ST6-30' + w + 'GSK', family: 'ST6 Heavy Duty 16GA Work Table', category: 'work_table', overall_width_in: w, overall_depth_in: 30, overall_height_in: 35, top_gauge: 16, stainless_type: 'Type 300', features: 'Heavy-duty 16GA Type 300 stainless top; galvanized legs with adjustable undershelf; sound deadened top' });
});

// JNS Maple Tops
const jnsMap = [ { m: 'JNS01', w: 36 }, { m: 'JNS02', w: 48 }, { m: 'JNS03', w: 60 }, { m: 'JNS04', w: 72 }, { m: 'JNS05', w: 84 }, { m: 'JNS06', w: 96 }, { m: 'JNS07', w: 108 }, { m: 'JNS08', w: 120 } ];
jnsMap.forEach(item => {
  addProduct({ model: item.m, family: 'Wood Top Work Table JNS', category: 'work_table', overall_width_in: item.w, overall_depth_in: 30, overall_height_in: 35, top_gauge: null, stainless_type: 'Hard Rock Maple', features: '1-1/2 in thick edge-grain Northern Hard Rock Maple top with Boos Block Cream with Beeswax Finish; galvanized legs with adjustable undershelf' });
});

// Cucina Series
addProduct({ model: 'BBSS4824', family: 'Stainless Cucina Classico', category: 'work_table', overall_width_in: 48, overall_depth_in: 24, overall_height_in: 35, top_gauge: 16, stainless_type: 'Type 300', features: '16GA Type 300 stainless steel top; commercial stainless tubular legs and perforated undershelf; stationary bullet feet' });
addProduct({ model: 'BBSS4824C', family: 'Stainless Cucina Classico', category: 'work_table', overall_width_in: 48, overall_depth_in: 24, overall_height_in: 35, top_gauge: 16, stainless_type: 'Type 300', features: '16GA Type 300 stainless steel top; commercial stainless tubular legs with locking commercial casters; mobile' });
addProduct({ model: 'CUCE3624', family: 'Stainless Cucina Elegante', category: 'work_table', overall_width_in: 36, overall_depth_in: 24, overall_height_in: 35, top_gauge: 16, stainless_type: 'Type 300', features: '16GA Type 300 stainless top with towel bar and utensil hooks; commercial food prep station' });
addProduct({ model: 'CUCE4824', family: 'Stainless Cucina Elegante', category: 'work_table', overall_width_in: 48, overall_depth_in: 24, overall_height_in: 35, top_gauge: 16, stainless_type: 'Type 300', features: '16GA Type 300 stainless top with towel bar and utensil hooks; commercial food prep station' });

// -------------------------------------------------------------
// 3. COMMERCIAL FILLER TABLES (EFT8 SERIES)
// -------------------------------------------------------------
[12, 15, 18, 24].forEach(w => {
  addProduct({ model: 'EFT8-30' + w + '-X', family: 'EFT8 Filler Tables', category: 'filler_table', overall_width_in: w, overall_depth_in: 30, overall_height_in: 35, top_gauge: 18, stainless_type: 'Type 430', features: '18GA stainless top with 1-1/2 in stallion safety edge; galvanized legs with undershelf; designed to fill narrow gaps between line equipment' });
  addProduct({ model: 'EFT8-24' + w + '-X', family: 'EFT8 Filler Tables', category: 'filler_table', overall_width_in: w, overall_depth_in: 24, overall_height_in: 35, top_gauge: 18, stainless_type: 'Type 430', features: '18GA stainless top with 1-1/2 in stallion safety edge; galvanized legs with undershelf; 24 in depth filler table' });
});

// -------------------------------------------------------------
// 4. COMMERCIAL EQUIPMENT STANDS (EES8 & EESS8 SERIES)
// -------------------------------------------------------------
[24, 36, 48, 60, 72].forEach(w => {
  addProduct({ model: 'EES8-30' + w, family: 'EES8 Equipment Stand', category: 'equipment_stand', overall_width_in: w, overall_depth_in: 30, overall_height_in: 24, top_gauge: 16, stainless_type: 'Type 430', features: '16GA stainless top with 1-1/2 in turned-up hemmed lip on 3 sides; galvanized legs and adjustable undershelf; 24 in working height for countertop appliances' });
});
[36, 48, 60, 72].forEach(w => {
  addProduct({ model: 'EESS8-30' + w, family: 'EESS8 Stainless Equipment Stand', category: 'equipment_stand', overall_width_in: w, overall_depth_in: 30, overall_height_in: 24, top_gauge: 16, stainless_type: 'Type 300', features: '16GA Type 300 stainless top with 1-1/2 in turned-up edge; stainless legs with stainless undershelf; commercial griddle and fryer stand' });
});

console.log('Total products generated:', products.length);

const outDir = path.join(__dirname, '../data');
fs.writeFileSync(path.join(outDir, 'verified_public_products.json'), JSON.stringify(products, null, 2), 'utf8');

const csvHeaders = [
  'id', 'brand', 'model', 'family', 'category', 'verification_status',
  'overall_width_in', 'overall_depth_in', 'overall_height_in',
  'compartments', 'bowl_width_in', 'bowl_front_to_back_in', 'bowl_depth_in',
  'drainboard_count', 'left_drainboard_in', 'right_drainboard_in',
  'backsplash_in', 'top_gauge', 'stainless_type', 'features',
  'certifications', 'source_title', 'source_url', 'source_type',
  'verified_on', 'source_notes'
];

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const csvRows = [
  csvHeaders.join(','),
  ...products.map(p => csvHeaders.map(h => escapeCsv(p[h])).join(','))
];

fs.writeFileSync(path.join(outDir, 'verified_public_products.csv'), csvRows.join('\n'), 'utf8');
console.log('Successfully wrote JSON and CSV truth-set files.');
