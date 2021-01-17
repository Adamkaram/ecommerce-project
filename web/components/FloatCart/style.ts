import createStyle from "../../utils/StyleGenerator";

interface Style {
  [thingName: string]: React.CSSProperties;
}

const styles: Style = createStyle({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  productImageContainer: {
    padding: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  productDetails: {
    padding: 5,
    flex: 3,
    display: "flex",
    flexDirection: "column",
  },
  productImage: {
    height: 100,
    width: 66,
  },
  productTitle: {
    color: "#333",
    fontSize: 13,
  },
  attributes: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    color: "#007BFF",
    fontSize: 15,
    direction: "ltr",
  },
  controlCount: {
    flexDirection: "row",
    display: "flex",
  },
  countHandlers: {
    borderColor: "#007BFF",
    paddingBlock: 7,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginInline: 9,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    background: "none",
  },
  countText: {
    color: "#007BFF",
    alignSelf: "center",
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
  },
  remove: {
    borderColor: "rgba(255,59,48,1)",
    paddingInline: 7,
    paddingBlock: 3,
    borderWidth: 1,
    borderRadius: 4,
    marginInline: 8,
    background: "none",
  },
  removeText: {
    color: "rgba(255,59,48,1)",
    alignSelf: "center",
    fontFamily: "Cairo-Regular",
    fontSize: 21,
  },
  cartImage: {
    height: 50,
    width: 50,
  },
});

export default styles;
