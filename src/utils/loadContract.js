import contract from "@truffle/contract";

export const loadContract = async (contractName) => {
  const res = await fetch(`/contracts/${contractName}.json`);
  const Artifact = await res.json();

  return contract(Artifact);
};
