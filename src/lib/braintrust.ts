import * as aiPkg from "ai";
import { initLogger, wrapAISDK, wrapTraced } from "braintrust";

const PROJECT_NAME = "discodisco";

let _initialized = false;
function ensureInit() {
  if (_initialized) return;
  if (!process.env.BRAINTRUST_API_KEY) {
    _initialized = true;
    return;
  }
  initLogger({ projectName: PROJECT_NAME, asyncFlush: true });
  _initialized = true;
}

ensureInit();

const wrapped =
  process.env.BRAINTRUST_API_KEY != null ? wrapAISDK(aiPkg) : aiPkg;

export const generateText = wrapped.generateText;
export const Output = wrapped.Output;
export const embed = wrapped.embed;
export const embedMany = wrapped.embedMany;

export type FlexibleSchema<T> = aiPkg.FlexibleSchema<T>;

export function trace<F extends (...args: never[]) => unknown>(
  name: string,
  fn: F,
): F {
  if (!process.env.BRAINTRUST_API_KEY) return fn;
  return wrapTraced(fn, { name }) as F;
}
