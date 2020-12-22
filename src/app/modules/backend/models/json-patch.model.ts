import {JsonPatchType} from '../types/json-patch.type';

/**
 * JsonPatch RequestBody builder
 *
 * @export
 * @class JsonPatchModel
 * @template T
 * @template R
 */
export class JsonPatchModel<T, R> {
  /**
   *  Operation
   *  @type {JsonPatchType}
   */
  op: JsonPatchType;
  /**
   *  Operation Path
   */
  path: string;
  /**
   *  Operation Value
   */
  value: R;

  /**
   * Building JsonPath syntax according to Generic
   *
   * @template T
   * @param {keyof T} path
   * @memberof JsonPatchModel
   */
  public buildPatch(path: keyof T) {
    this.path = '/' + path;
  }
}
