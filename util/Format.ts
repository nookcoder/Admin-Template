export function formatCreateAt(createAt: string) {
  return createAt.slice(0, 10);
}

export function formatBloodType(aboRh: string) {
  const aboRhSplit = aboRh.split("/");
  const rh = aboRhSplit[1];
  const abo = aboRhSplit[0];
  if (rh === "POSITIVE") {
    return `RH+ ${abo}형`;
  }
  return `RH- ${abo}형`;
}
