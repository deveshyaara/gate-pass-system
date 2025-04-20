import { GatePassTable } from "@/components/gate-pass-table";
import clientPromise from "@/lib/mongodb";

export default async function GatePassHistoryPage() {
  const client = await clientPromise;
  const db = client.db();
  const gatePasses = await db.collection("gatePasses").find().toArray();

  // Convert MongoDB ObjectId to string for compatibility
  const formattedGatePasses = gatePasses.map((pass) => ({
    id: pass._id.toString(),
    name: pass.name,
    status: pass.status,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gate Pass History</h1>
        <p className="text-muted-foreground mt-2">View all gate passes and their current status</p>
      </div>

      <GatePassTable passes={formattedGatePasses} />
    </div>
  );
}
