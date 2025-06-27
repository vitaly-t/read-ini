import {readFileSync} from 'node:fs';

/**
 * Type of data produced by `readIniFile`
 */
export type INI_Data<T> = { [name: string]: T | { [name: string]: T } };

/**
 * Full section name, which consist of the section name itself, plus optional alias.
 *
 * In this implementation, when a section alias is specified, it is used for namespace
 * resolution instead of the section name.
 */
export type INI_Section = { name: string, alias?: string };

/**
 * Callback type for optional value converter used by `readIniFile`.
 *
 * Note that `section` is `undefined` when it is global.
 */
export type INI_ConvertCB<T> = (cb: { key: string, value: string, section?: INI_Section }) => T;

/**
 * Reads and parses an INI file, with an optional value-type converter.
 *
 * - section `[name]` namespaces are supported:
 *   - When a section appears multiple times, its inner values are extended.
 *   - Sections called `global` (case-insensitive) expose global variables.
 *   - Sections support aliasing: `[section "alias"]`, with the alias used as
 *     override for the section name, for namespace resolution.
 * - each variable must be in the form of `name = value`
 * - spaces surrounding `=`, `value` or section names are ignored
 * - the `value` is taken until the end of line
 * - lines that start with `;` or `#` are skipped
 */
export function readIniFile<T = string>(iniFile: string, cb?: INI_ConvertCB<T>): INI_Data<T> {
    const lines = readFileSync(iniFile, 'utf-8')
        .replace(/\r/g, '')
        .split('\n')
        .map(a => a.trim())
        .filter(f => f.length > 1 && f[0] !== ';' && f[0] !== '#');

    const result: INI_Data<T> = {};
    let root: any = result, section: INI_Section | undefined;
    for (const a of lines) {
        const m = a.match(/^\s*([\w$.-]+)\s*=\s*(.*)/);
        if (m) {
            const key = m[1], value = m[2];
            root[key] = typeof cb === 'function' ? cb({key, value, section}) : value;
        } else {
            const s = a.match(/\[\s*([\w$.-]+)\s*("(.*)")?\s*]/);
            if (s) {
                section = {name: s[1], alias: s[3]};
                const name = section.alias || section.name; // alias overrides name
                if (name.toLowerCase() === 'global') {
                    root = result;
                    section = undefined;
                } else {
                    root = result[name] ??= {};
                }
            }
        }
    }
    return result;
}
