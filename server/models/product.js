const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    ar: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  details: {
    ar: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  categories: [
    {
      _id: String,
      name: {
        ar: {
          type: String,
          required: true
        },
        en: {
          type: String,
          required: true
        }
      },
      parentId: {
        type: Schema.Types.ObjectId,
        ref: "Cat"
      },
      image: String
    }
  ],
  attributes: [
    {
      attr_name: {
        ar: {
          type: String
        },
        en: {
          type: String
        }
      },
      attr_values: [
        {
          ar: {
            type: String
          },
          en: {
            type: String
          }
        }
      ]
    }
  ],
  pieces: [
    {
      attributes: [
        {
          attr_name: {
            ar: {
              type: String
            },
            en: {
              type: String
            }
          },
          attr_value: {
            ar: {
              type: String
            },
            en: {
              type: String
            }
          }
        }
      ],
      inStock: {
        type: Number
      },
      price: {
        type: Number
      },
      hasDiscount: {
        type: Boolean
      },
      discountPrice: {
        type: Number
      },
      discountEnd: {
        type: Date
      },
      images: [{}]
    }
  ],
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  discountEnd: {
    type: Date
  },
  hasDiscount: {
    type: Boolean
  },
  reviews: [
    {
      stars: {
        type: Number
      },
      comment: {
        type: String
      }
    }
  ],
  images: [{}],
  specs: [
    {
      title: {
        ar: {
          type: String
        },
        en: {
          type: String
        }
      },
      details: {
        ar: {
          type: String
        },
        en: {
          type: String
        }
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  view: {
    type: Number,
    default: 0
  },
  tableOfSpecs: [{}],

  tableOfAttrs: [{}],

  tableOfPieces: [{}],
  brand: {
    ar: String,
    en: String
  },
  isOffer: {
    type: Boolean,
    default: false
  },
  sold: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Number
  }
});
productSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Product", productSchema);
