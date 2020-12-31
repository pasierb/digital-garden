import { factory } from "./stencilbot"

const getImageUrl = factory({
  awscdk:
    "https://cdn.stencilbot.io/project?w=800&h=400&0.img=https%3A%2F%2Fmpasierbski.com%2Fimages%2Fblog-aws-header-bg.png&1.x=50&1.w=300&1.imgFit=contain&1.img=https%3A%2F%2Fmpasierbski.com%2Fimages%2Faws-cdk-text-logo.png&2.x=360&2.w=370&2.txt=${title}&2.color=%233e3838&2.fontSize=40&2.font=Ubuntu%3A700&2.txtAlign=center&2.valign=middle",
  testend: "abc&${title}",
  testthrow: "abc${ssss",
})

describe("stencilbot", () => {
  describe("getImageUrl", () => {
    it("return empty string if template key not provided", () => {
      expect(getImageUrl({})).toBe("")
    })

    it("return awscdk template", () => {
      expect(getImageUrl({ stencilbot: "awscdk", title: "Bam bam" })).toBe(
        "https://cdn.stencilbot.io/project?w=800&h=400&0.img=https%3A%2F%2Fmpasierbski.com%2Fimages%2Fblog-aws-header-bg.png&1.x=50&1.w=300&1.imgFit=contain&1.img=https%3A%2F%2Fmpasierbski.com%2Fimages%2Faws-cdk-text-logo.png&2.x=360&2.w=370&2.txt=Bam%20bam&2.color=%233e3838&2.fontSize=40&2.font=Ubuntu%3A700&2.txtAlign=center&2.valign=middle"
      )
    })

    it("handles interpolation at the end", () => {
      expect(getImageUrl({ stencilbot: "testend", title: "Works" })).toBe(
        "abc&Works"
      )
    })

    it("should throw an error if no end tag", () => {
      expect(() => getImageUrl({ stencilbot: "testthrow" })).toThrowError()
    })
  })
})
