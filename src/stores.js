import { select_option } from 'svelte/internal';
import { writable, derived } from 'svelte/store';

export const age = writable(42);
export const gender = writable('F');

const base_value = 75000

let factors = {
	"F": 1.1,
	"M": 0.9,
	"D": 1
}

let age_factor = (x) => (119-x)/99
let valueFn = (g, a) => Math.round(factors[g] * base_value * age_factor(a))

export const value = derived(
	[age, gender],
	([$age, $gender], set) => {
		set('updating...');
		// Call your API here and pass the parameters to your ML model:
		fetch(`https://node-hnapi.herokuapp.com/item/${$age}`)
			.then(r => r.json())
			.then(x => console.log(x))
			.finally(() => {
				// Set value here to update the displayed value
				set(valueFn($gender, $age));
		});
		return () => {
			// We override the `set` function to eliminate race conditions
			// This does *not* abort running fetch() requests, it only prevents
			// them from overriding the store.
			// To learn about canceling fetch requests, search the internet for `AbortController`
			set = () => {}
		}
	}, 'one moment...'
);