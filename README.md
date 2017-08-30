# Marketo-challenge

My final question is whether I can assume the original leads list would always be in chronological order as it is in the sample file. If yes, use dedup.js. If no, use sortDedup.js, which stable sorts the leads chronologically before deduplicating them.

Both scripts read in './leads.json' and require the node module 'fs' (included in folder) to write output to 'deduplicatedLeads.json'.