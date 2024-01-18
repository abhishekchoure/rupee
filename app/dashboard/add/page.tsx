import AddTransactionForm from "@/components/AddTransactionForm";

export default function AddTransaction() {
  return (
    <>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Add Transaction</h1>
      </div>
      <AddTransactionForm />
    </>
  );
}
