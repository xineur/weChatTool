import { post } from "@/render/utils/require";
import { TuringParams } from "@/interface/api";

const url: {[p: string]: string} = {
  turing: `http://openapi.tuling123.com/openapi/api/v2`
};

export default {
  turing (params: TuringParams) {
    return post(url.turing, params)
  }
}
